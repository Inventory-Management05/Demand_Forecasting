import React, { useState } from 'react';
import axios from 'axios';
import "ForecastSales.css";

function SalesPrediction() {
  const [year, setYear] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', { year });
      setResult(response.data);
    } catch (error) {
      console.error('Error fetching prediction', error);
    }
  };

  return (
    <div>
      <h2>Predict Sales</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Year:
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {result && (
        <div>
          <h3>Total Sales: {result.total_sales}</h3>
          <div dangerouslySetInnerHTML={{ __html: result.plot }} />
        </div>
      )}
    </div>
  );
}

export default SalesPrediction;
