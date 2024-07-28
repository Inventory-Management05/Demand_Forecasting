import React, { useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import './ForecastSales.css';

const ForecastSales = () => {
  const [forecastType, setForecastType] = useState('yearly');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [file, setFile] = useState(null);
  const [retrain, setRetrain] = useState(false);
  const [monthlyGraph, setMonthlyGraph] = useState(null);
  const [weeklyGraph, setWeeklyGraph] = useState(null);
  const [stockGraph, setStockGraph] = useState(null);
  const [totalSalesYear, setTotalSalesYear] = useState('');
  const [totalSalesMonth, setTotalSalesMonth] = useState('');
  const [error, setError] = useState('');

  const handleForecastTypeChange = (event) => {
    setForecastType(event.target.value);
    setMonth('');
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleRetrainChange = (event) => {
    setRetrain(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('forecast_type', forecastType);
    formData.append('year', year);
    if (forecastType === 'monthly' && month) formData.append('month', month);
    if (file) formData.append('file', file);
    formData.append('retrain', retrain);

    try {
      const response = await axios.post('http://localhost:5000/predict', formData, 
        { headers: { 'Content-Type': 'multipart/form-data' } });

      console.log("Response data:", response.data); // Debugging

      if (response.data.error) {
        setError(response.data.error);
        setMonthlyGraph(null);
        setWeeklyGraph(null);
        setStockGraph(null);
        setTotalSalesYear('');
        setTotalSalesMonth('');
      } else {
        setMonthlyGraph(response.data.monthly_graph ? JSON.parse(response.data.monthly_graph) : null);
        setWeeklyGraph(response.data.weekly_graph && response.data.weekly_graph.specific_month ? JSON.parse(response.data.weekly_graph.specific_month) : null);
        setStockGraph(response.data.stock_graph ? JSON.parse(response.data.stock_graph) : null);
        setTotalSalesYear(response.data.yearly_total_sales);
        setTotalSalesMonth(response.data.monthly_total_sales || '');
        setError('');
      }
    } catch (error) {
      setError('An error occurred while fetching the forecast.');
      setMonthlyGraph(null);
      setWeeklyGraph(null);
      setStockGraph(null);
      setTotalSalesYear('');
      setTotalSalesMonth('');
      console.error("Error fetching forecast:", error); // Debugging
    }
  };

  return (
    <div className="forecast-container">
      <form onSubmit={handleSubmit} className="forecast-form">
        <label className="forecast-label">
          Forecast Type:
          <select value={forecastType} onChange={handleForecastTypeChange} className="forecast-input">
            <option value="yearly">Yearly Forecast</option>
            <option value="monthly">Monthly Forecast</option>
            <option value="stock">Stock Levels and Stockouts</option>
          </select>
        </label>
        <label className="forecast-label">
          Enter Year:
          <input type="text" value={year} onChange={handleYearChange} className="forecast-input" />
        </label>
        {forecastType === 'monthly' && (
          <label className="forecast-label">
            Enter Month (1-12):
            <input type="text" value={month} onChange={handleMonthChange} className="forecast-input" />
          </label>
        )}
        <label className="forecast-label">
          Upload Data File (optional):
          <input type="file" onChange={handleFileChange} className="forecast-input" />
        </label>
        <label className="forecast-label">
          Retrain Model:
          <input type="checkbox" checked={retrain} onChange={handleRetrainChange} className="forecast-checkbox" />
        </label>
        <button type="submit" className="forecast-button">Predict</button>
      </form>
      {error && <p className="forecast-error">{error}</p>}
      {totalSalesYear && (
        <div className="forecast-result">
          <h3 className="forecast-total">Total Predicted Sales of {year}: ₹{totalSalesYear}</h3>
        </div>
      )}
      {monthlyGraph && (
        <div className="forecast-plot">
          <h3>Monthly Forecast Plot</h3>
          <Plot 
            data={monthlyGraph.data} 
            layout={{ ...monthlyGraph.layout, width: 1000, height: 400 }} 
            style={{ width: '100%', height: '100%' }}  
          />
        </div>
      )}
      {totalSalesMonth && (
        <div className="forecast-result">
          <h3 className="forecast-total">Total Predicted Sales for Month {month}: ₹{totalSalesMonth}</h3>
        </div>
      )}
      {weeklyGraph && (
        <div className="forecast-plot">
          <h3>Weekly Forecast Plot</h3>
          <Plot 
            data={weeklyGraph.data} 
            layout={{ ...weeklyGraph.layout, width: 1000, height: 400 }} 
            style={{ width: '100%', height: '100%' }} 
          />
        </div>
      )}
      {stockGraph && (
        <div className="forecast-plot">
          <h3>Stock Levels and Stockouts</h3>
          <Plot 
            data={stockGraph.data} 
            layout={{ ...stockGraph.layout, width: 1000, height: 400 }} 
            style={{ width: '100%', height: '100%' }} 
          />
        </div>
      )}
    </div>
  );
};

export default ForecastSales;