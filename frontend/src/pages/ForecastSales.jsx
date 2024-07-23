import React, { useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

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
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Year:
          <input type="text" value={year} onChange={handleYearChange} />
        </label>
        <button type="submit">Predict</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {totalSales && (
        <div>
          <h3>Total Sales: {totalSales}</h3>
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
