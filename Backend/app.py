from flask import Flask, render_template, request, redirect, url_for
import plotly.graph_objects as go
import plotly.io as pio
import pandas as pd
from prophet import Prophet
import joblib
import os

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['ALLOWED_EXTENSIONS'] = {'csv', 'xlsx'}

# Load the saved model
model = joblib.load('final_prophet_model.pkl')

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

def plot_forecast(year):
    # Generate future dates for the specified year
    future_dates = pd.date_range(start=f'{year}-01-01', end=f'{year}-12-31', freq='D')
    future_df = pd.DataFrame({'ds': future_dates})

    # Perform prediction
    forecast = model.predict(future_df)

    forecast.set_index('ds', inplace=True)
    monthly_forecast = forecast['yhat'].resample('M').sum()

    # Create Plotly figure
    fig = go.Figure()
    fig.add_trace(go.Scatter(x=monthly_forecast.index, y=monthly_forecast.values, mode='lines+markers', name='Monthly Predictions'))
    fig.update_layout(
        title=f'Monthly Forecast Plot for {year}',
        xaxis_title='Month',
        yaxis_title='Monthly Prediction',
        xaxis=dict(tickformat='%b %Y')
    )

    return pio.to_html(fig, full_html=False)

def calculate_total_sales(year):
    # Calculate the total sales for the specified year
    future_dates = pd.date_range(start=f'{year}-01-01', end=f'{year}-12-31', freq='D')
    future_df = pd.DataFrame({'ds': future_dates})
    forecast = model.predict(future_df)
    return forecast['yhat'].sum()

def retrain_model(file_path):
    # Load the user-provided data
    if file_path.endswith('.csv'):
        data = pd.read_csv(file_path)
    elif file_path.endswith('.xlsx'):
        data = pd.read_excel(file_path)
    else:
        raise ValueError("Unsupported file type. Please upload a CSV or Excel file.")

    # Auto-detect date and value columns
    date_col = next((col for col in data.columns if pd.to_datetime(data[col], errors='coerce').notna().any()), None)
    value_col = next((col for col in data.columns if pd.to_numeric(data[col], errors='coerce').notna().any()), None)

    if date_col is None or value_col is None:
        raise ValueError("Could not detect date or value columns in the data.")

    # Prepare data for retraining
    data = data[[date_col, value_col]]
    data.columns = ['ds', 'y']
    data['ds'] = pd.to_datetime(data['ds'])
    data['y'] = pd.to_numeric(data['y'], errors='coerce')

    # Retrain the model
    model = Prophet()
    model.fit(data)

    # Save the retrained model
    joblib.dump(model, 'final_prophet_model.pkl')

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        if 'year' in request.form:
            year = request.form.get('year')
            if not year:
                return render_template('index.html', error='Please enter a year.')

            try:
                # Plot the forecast and calculate total sales for the year
                plot_html = plot_forecast(year)
                total_yearly_sales = calculate_total_sales(year)

                # Round the total sales to 2 decimal places
                total_yearly_sales = round(total_yearly_sales, 2)

                return render_template('index.html', plot=plot_html, total_sales=f'{total_yearly_sales}', year=year)
            except Exception as e:
                return render_template('index.html', error=f'Error: {str(e)}')

        elif 'file' in request.files:
            file = request.files['file']
            if file and allowed_file(file.filename):
                filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
                file.save(filename)
                try:
                    retrain_model(filename)
                    return redirect(url_for('index'))
                except Exception as e:
                    return render_template('index.html', error=f'Error retraining model: {str(e)}')

    return render_template('index.html')

if __name__ == '__main__':
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])
    app.run(port=5000, debug=True)
