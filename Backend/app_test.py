import numpy as np
np.float_=np.float16

from flask import Flask, send_from_directory, jsonify, request
import os
from flask_cors import CORS
import plotly.graph_objects as go
import plotly.io as pio
import pandas as pd
import joblib
from prophet import Prophet

app = Flask(__name__)

CORS(app)

app.config['UPLOAD_FOLDER'] = 'uploads'

model = joblib.load('final_prophet_model.pkl')

def generate_forecast_data(year):
    future_dates = pd.date_range(start=f'{year}-01-01', end=f'{year}-12-31', freq='D')
    future_df = pd.DataFrame({'ds': future_dates})

    forecast = model.predict(future_df)
    forecast.set_index('ds', inplace=True)

    monthly_forecast = forecast['yhat'].resample('M').sum()
    weekly_forecast = forecast['yhat'].resample('W').sum()
    
    return monthly_forecast, weekly_forecast

def generate_inventory_graphs(year):
    start_date = f'{year}-01-01'
    end_date = f'{year}-12-31'
    dates = pd.date_range(start=start_date, end=end_date, freq='D')
    
    # Dummy implementation for stockouts and other inventory metrics
    stockout_data = pd.Series([5 if x % 10 == 0 else 0 for x in range(len(dates))], index=dates)
    stockout_resolved_data = pd.Series([3 if x % 15 == 0 else 0 for x in range(len(dates))], index=dates)
    
    return stockout_data, stockout_resolved_data

@app.route('/predict', methods=['POST'])
def predict():
    year = request.form.get('year')
    try:
        monthly_forecast, weekly_forecast = generate_forecast_data(year)
        total_sales = round(monthly_forecast.sum(), 2)

        # Monthly Forecast Plot
        monthly_fig = go.Figure()
        monthly_fig.add_trace(go.Scatter(x=monthly_forecast.index, y=monthly_forecast.values, mode='lines+markers', name='Monthly Predictions'))
        monthly_fig.update_layout(
            title=f'Monthly Forecast Plot for {year}',
            xaxis_title='Month',
            yaxis_title='Monthly Prediction',
            xaxis=dict(tickformat='%b %Y')
        )
        monthly_graph_json = monthly_fig.to_json()

         # Weekly Forecast Plot
        weekly_fig = go.Figure()
        weekly_fig.add_trace(go.Scatter(x=weekly_forecast.index, y=weekly_forecast.values, mode='lines+markers', name='Weekly Predictions'))
        weekly_fig.update_layout(
            title=f'Weekly Forecast Plot for {year}',
            xaxis_title='Week',
            yaxis_title='Weekly Prediction',
            xaxis=dict(tickformat='%b %Y')
        )
        weekly_graph_json = weekly_fig.to_json()

        # Inventory Management Graphs
        stockout_data, stockout_resolved_data = generate_inventory_graphs(year)

        stockout_fig = go.Figure()
        stockout_fig.add_trace(go.Bar(x=stockout_data.index, y=stockout_data.values, name='Stockouts'))
        stockout_fig.add_trace(go.Bar(x=stockout_resolved_data.index, y=stockout_resolved_data.values, name='Stockout Resolutions'))
        stockout_fig.update_layout(
            title='Stockouts and Resolutions',
            xaxis_title='Date',
            yaxis_title='Count',
            barmode='group'
        )
        stockout_graph_json = stockout_fig.to_json()

        return jsonify({
            'monthly_graph': monthly_graph_json,
            'weekly_graph': weekly_graph_json,
            'stockout_graph': stockout_graph_json,
            'total_sales': total_sales,
            'year': year
        })
    except Exception as e:
        return jsonify({'error': f'Error: {str(e)}'}), 500
    
    #     graph_json = fig.to_json()
    #     return jsonify({'graph': graph_json, 'total_sales': total_sales, 'year': year})
    # except Exception as e:
    #     return jsonify({'error': f'Error: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)
