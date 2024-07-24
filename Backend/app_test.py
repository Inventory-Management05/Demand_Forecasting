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
    
    return monthly_forecast

@app.route('/predict', methods=['POST'])
def predict():
    year = request.form.get('year')
    try:
        monthly_forecast = generate_forecast_data(year)
        total_sales = round(monthly_forecast.sum(), 2)

        fig = go.Figure()
        fig.add_trace(go.Scatter(x=monthly_forecast.index, y=monthly_forecast.values, mode='lines+markers', name='Monthly Predictions'))
        fig.update_layout(
            title=f'Monthly Forecast Plot for {year}',
            xaxis_title='Month',
            yaxis_title='Monthly Prediction',
            xaxis=dict(tickformat='%b %Y')
        )
        
        graph_json = fig.to_json()
        return jsonify({'graph': graph_json, 'total_sales': total_sales, 'year': year})
    except Exception as e:
        return jsonify({'error': f'Error: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)
