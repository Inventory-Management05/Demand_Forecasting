import React, { useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import './ForecastSales.css';

const ForecastSales = () => {
  const [year, setYear] = useState('');
  const [monthlyGraph, setMonthlyGraph] = useState(null);
  const [weeklyGraph, setWeeklyGraph] = useState(null);
  const [stockoutGraph, setStockoutGraph] = useState(null);
  const [totalSales, setTotalSales] = useState('');
  const [error, setError] = useState('');

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/predict', new URLSearchParams({ year }));
      if (response.data.error) {
        setError(response.data.error);
        setMonthlyGraph(null);
        setWeeklyGraph(null);
        setStockoutGraph(null);
        setTotalSales('');
      } else {
        setMonthlyGraph(JSON.parse(response.data.monthly_graph));
        setWeeklyGraph(JSON.parse(response.data.weekly_graph));
        setStockoutGraph(JSON.parse(response.data.stockout_graph));
        setTotalSales(response.data.total_sales);
        setError('');
      }
    } catch (error) {
      setError('An error occurred while fetching the forecast.');
      setMonthlyGraph(null);
      setWeeklyGraph(null);
      setStockoutGraph(null);
      setTotalSales('');
    }
  };

  return (
    <div className="forecast-container">
      <form onSubmit={handleSubmit} className="forecast-form">
        <label className="forecast-label">
          Enter Year:
          <input type="text" value={year} onChange={handleYearChange} className="forecast-input" />
        </label>
        <button type="submit" className="forecast-button">Predict</button>
      </form>
      {error && <p className="forecast-error">{error}</p>}
      {totalSales && (
        <div className="forecast-result">
          <h3 className="forecast-total">Total Sales of {year}: ₹{totalSales}</h3>
          {monthlyGraph && (
            <div>
              <h4>Monthly Forecast</h4>
              <Plot
                data={monthlyGraph.data}
                layout={monthlyGraph.layout}
                style={{ width: '100%', height: '600px' }}
              />
            </div>
          )}
          {weeklyGraph && (
            <div>
              <h4>Weekly Forecast</h4>
              <Plot
                data={weeklyGraph.data}
                layout={weeklyGraph.layout}
                style={{ width: '100%', height: '600px' }}
              />
            </div>
          )}
          {stockoutGraph && (
            <div>
              <h4>Stockouts and Resolutions</h4>
              <Plot
                data={stockoutGraph.data}
                layout={stockoutGraph.layout}
                style={{ width: '100%', height: '600px' }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ForecastSales;
