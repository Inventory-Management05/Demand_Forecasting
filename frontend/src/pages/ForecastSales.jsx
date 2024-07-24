import React, { useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import './ForecastSales.css';

const ForecastSales = () => {
  const [year, setYear] = useState('');
  const [graphData, setGraphData] = useState(null);
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
        setGraphData(null);
        setTotalSales('');
      } else {
        setGraphData(JSON.parse(response.data.graph));
        setTotalSales(response.data.total_sales);
        setError('');
      }
    } catch (error) {
      setError('An error occurred while fetching the forecast.');
      setGraphData(null);
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
          {graphData && (
            <Plot
              data={graphData.data}
              layout={graphData.layout}
              style={{ width: '100%', height: '600px' }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ForecastSales;