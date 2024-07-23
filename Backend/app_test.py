from flask import Flask, jsonify, render_template, request, redirect, url_for, flash
import pandas as pd
from prophet import Prophet
from werkzeug.utils import secure_filename
import os
import joblib
import plotly.graph_objs as go
import plotly.io as pio
from flask_cors import CORS

app = Flask(__name__)
app.secret_key = 'your_secret_key'
app.config['UPLOAD_FOLDER'] = 'uploads'

# Enable CORS
CORS(app)

# Ensure upload folder exists
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

# Initialize Prophet model
model = joblib.load('final_prophet_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    year = int(data['year'])

    try:
        plot_html = plot_forecast(year)
        total_sales = calculate_total_sales(year)
    
        return jsonify({'plot': plot_html, 'total_sales': total_sales})
    except ValueError:
        return jsonify({'error': 'Invalid year entered. Please enter a valid year.'}), 400

@app.route('/retrain', methods=['POST'])
def retrain():
    file = request.files['file']
    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)

    try:
        retrain_model(file_path)
        return jsonify({'message': 'Model retrained successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def plot_forecast(year):
    # Generate future dates for prediction
    start_date = f'{year}-01-01'
    end_date = f'{year}-12-31'
    future_dates = pd.date_range(start=start_date, end=end_date, freq='D')
    future_df = pd.DataFrame({'ds': future_dates})

    # Perform prediction
    forecast = model.predict(future_df)

    forecast.set_index('ds', inplace=True)
    weekly_forecast = forecast['yhat'].resample('W').sum()

    # Create Plotly figure
    fig = go.Figure()
    fig.add_trace(go.Scatter(x=weekly_forecast.index, y=weekly_forecast.values, mode='lines', name='Weekly Predictions'))
    fig.update_layout(title=f'Weekly Forecast Plot for {year}', xaxis_title='Week', yaxis_title='Weekly Prediction')

    return pio.to_html(fig, full_html=False)

def calculate_total_sales(year):
    # Calculate the total sales for the given year
    start_date = f'{year}-01-01'
    end_date = f'{year}-12-31'
    future_dates = pd.date_range(start=start_date, end=end_date, freq='D')
    future_df = pd.DataFrame({'ds': future_dates})
    forecast = model.predict(future_df)
    return round(forecast['yhat'].sum(), 2)

def retrain_model(file_path):
    if file_path.endswith('.csv'):
        data = pd.read_csv(file_path)
    elif file_path.endswith('.xlsx'):
        data = pd.read_excel(file_path)

    # Auto-detect columns by checking data types
    date_col = next((col for col in data.columns if pd.api.types.is_datetime64_any_dtype(data[col]) or pd.api.types.is_string_dtype(data[col])), None)
    value_col = next((col for col in data.columns if pd.api.types.is_numeric_dtype(data[col])), None)

    if date_col and value_col:
        data = data.rename(columns={date_col: 'ds', value_col: 'y'})
        data['ds'] = pd.to_datetime(data['ds'])
        model.fit(data)
    else:
        raise ValueError("Data does not have the required columns for date and value.")

if __name__ == '__main__':
    app.run(debug=True)
