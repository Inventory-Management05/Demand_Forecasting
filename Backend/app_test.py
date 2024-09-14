import os
import numpy as np
np.float_ = np.float16

from flask import Flask, jsonify, request
from flask_cors import CORS
import plotly.graph_objects as go
import pandas as pd
import joblib
from prophet import Prophet
from io import StringIO

app = Flask(__name__)
CORS(app)

app.config['UPLOAD_FOLDER'] = 'uploads'
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

# Load initial model
model = joblib.load('final_prophet_model.pkl')

# Load initial data
initial_df = pd.read_excel('Groceries_Sales_data.xlsx')

# Explicitly rename columns for initial data
initial_df.rename(columns={'Date': 'date', 'Sales': 'sales'}, inplace=True)

def preprocess_data(file, save_path):
    print("Preprocessing data...")

    # Save the uploaded file
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], save_path)
    file.save(file_path)

    if file.filename.endswith('.csv'):
        df = pd.read_csv(file)
    elif file.filename.endswith(('.xls', '.xlsx')):
        df = pd.read_excel(file)
    else:
        raise ValueError("Unsupported file format. Please upload a CSV or Excel file.")
    
    # Debug: Print columns after loading the file
    print("Columns after loading the file:", df.columns)

    # Strip any leading/trailing whitespace from column names
    df.columns = df.columns.str.strip()

    # Debug: Print columns after stripping whitespace
    print("Columns after stripping whitespace:", df.columns)

    # Check if 'date' and 'sales' columns exist
    if 'date' not in df.columns or 'sales' not in df.columns:
        raise ValueError("Could not automatically detect 'date' and 'sales' columns in the input data")
    
    df['date'] = pd.to_datetime(df['date'], dayfirst=True, errors='coerce')
    df['sales'] = pd.to_numeric(df['sales'], errors='coerce')

    # Drop rows with invalid date or sales values
    df.dropna(subset=['date', 'sales'], inplace=True)

    # Debug: Print the first few rows of the dataframe
    print("First few rows of the dataframe:", df.head())

    return df[['date', 'sales']]

def retrain_model(new_data):
    global model
    model = Prophet()
    new_data.rename(columns={'date': 'ds', 'sales': 'y'}, inplace=True)
    model.fit(new_data)
    joblib.dump(model, 'final_prophet_model.pkl')

def generate_stock_data(df, year):
    df = df[df['date'].dt.year == int(year)].copy()
    df.sort_values('date', inplace=True)
    initial_stock = 10000
    df['cumulative_sales'] = df['sales'].cumsum()
    df['stock_level'] = initial_stock - df['cumulative_sales']
    stockout_threshold = 1000
    df['stockout'] = df['stock_level'] < stockout_threshold
    return df

def generate_forecast_data(year):
    future_dates = pd.date_range(start=f'{year}-01-01', end=f'{year}-12-31', freq='D')
    future_df = pd.DataFrame({'ds': future_dates})

    forecast = model.predict(future_df)
    forecast.set_index('ds', inplace=True)

    monthly_forecast = forecast['yhat'].resample('ME').sum()
    yearly_total = monthly_forecast.sum()

    weekly_forecast = forecast['yhat'].resample('W').sum()
    weekly_forecast_by_month = {month: weekly_forecast[weekly_forecast.index.month == month] for month in range(1, 13)}

    return monthly_forecast, weekly_forecast_by_month, yearly_total

@app.route('/predict', methods=['POST'])
def predict():
    try:
        print("Request received")
        data = request.form
        print("Form data:", data)
        forecast_type = data.get('forecast_type')
        year = data.get('year')
        month = data.get('month')
        retrain = data.get('retrain')
        file = request.files.get('file') if retrain else None

        if not year:
            raise ValueError("Year is required")

        if file and retrain:
            df = preprocess_data(file)
            retrain_model(df)
            stock_data = generate_stock_data(df, year)
        elif file:
            df = preprocess_data(file)
            stock_data = generate_stock_data(df, year)
        else:
            stock_data = generate_stock_data(initial_df, year)

        monthly_forecast, weekly_forecast_by_month, yearly_total = generate_forecast_data(year)
        total_sales_for_year = round(yearly_total, 2)

        monthly_graph = None
        weekly_forecast_json = {}
        total_sales_for_month = None
        stock_graph_json = None

        if forecast_type == 'yearly':
            monthly_fig = go.Figure()
            monthly_fig.add_trace(go.Scatter(x=monthly_forecast.index, y=monthly_forecast.values, mode='lines+markers', name='Monthly Predictions'))
            monthly_fig.update_layout(title=f'Monthly Forecast Plot for {year}', xaxis_title='Month', yaxis_title='Monthly Prediction', xaxis=dict(tickformat='%b %Y'))
            monthly_graph = monthly_fig.to_json()

        if forecast_type == 'monthly' and month:
            month = int(month)
            if month < 1 or month > 12:
                raise ValueError("Month must be between 1 and 12")

            weekly_data = weekly_forecast_by_month[month]
            weekly_fig = go.Figure()
            weekly_fig.add_trace(go.Scatter(x=weekly_data.index, y=weekly_data.values, mode='lines+markers', name='Weekly Predictions'))
            weekly_fig.update_layout(title=f'Weekly Forecast Plot for {year}-{month:02d}', xaxis_title='Week', yaxis_title='Weekly Prediction', xaxis=dict(tickformat='%b %d %Y'))
            weekly_forecast_json['specific_month'] = weekly_fig.to_json()
            total_sales_for_month = round(weekly_data.sum(), 2)

        if forecast_type == 'stock':
            stock_fig = go.Figure()
            stock_fig.add_trace(go.Scatter(x=stock_data['date'], y=stock_data['stock_level'], mode='lines+markers', name='Stock Levels')) 
            stock_fig.add_trace(go.Scatter(x=stock_data['date'], y=stock_data['stockout'], mode='markers', name='Stockouts', marker=dict(color='red')))
            stock_fig.update_layout(title=f'Stock Levels and Stockouts for {year}', xaxis_title='Date', yaxis_title='Stock Level', xaxis=dict(tickformat='%b %Y'))
            stock_graph_json = stock_fig.to_json()

        response = {
            'yearly_total_sales': total_sales_for_year if forecast_type == 'yearly' else None,
            'monthly_total_sales': total_sales_for_month if forecast_type == 'monthly' else None,
            'monthly_graph': monthly_graph,
            'weekly_graph': {'specific_month': weekly_forecast_json.get('specific_month')} if forecast_type == 'monthly' else None,
            'stock_graph': stock_graph_json,
        }
        return jsonify(response)
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
