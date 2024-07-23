import React, { useState } from 'react';
import axios from 'axios';
import './ForecastSales.css';

const ForecastSales = () => {
  const [year, setYear] = useState('');
  const [file, setFile] = useState(null);
  const [result, setResult] = useState({});
  const [error, setError] = useState('');

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmitYear = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('year', year);
      const response = await axios.post('http://localhost:5000/predict', formData);
      setResult(response.data);
      setError('');
    } catch (error) {
      setError(error.response.data.error || 'An error occurred');
    }
  };

  const handleSubmitFile = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post('http://localhost:5000/upload', formData);
      setResult({ message: response.data.message });
      setError('');
    } catch (error) {
      setError(error.response.data.error || 'An error occurred');
    }
  };

  return (
    <div className="forecast-sales-container">
      <h1>Forecast</h1>

      <form onSubmit={handleSubmitYear}>
        <label htmlFor="year">Enter Year for Prediction:</label>
        <input type="text" id="year" name="year" value={year} onChange={handleYearChange} required />
        <button type="submit">Submit</button>
      </form>

      <h2>Or Upload Data to Retrain the Model</h2>
      <form onSubmit={handleSubmitFile} encType="multipart/form-data">
        <label htmlFor="file">Upload CSV or Excel File:</label>
        <input type="file" id="file" name="file" accept=".csv,.xlsx" onChange={handleFileChange} required />
        <button type="submit">Upload and Retrain</button>
      </form>

      <div id="result">
        {result.plot && (
          <>
            <h2>Forecast Plot for {result.year}</h2>
            <div dangerouslySetInnerHTML={{ __html: result.plot }} />
          </>
        )}

        {result.total_sales && (
          <>
            <h2>Total Predicted Sales for {result.year}</h2>
            <div>Total Predicted Sales: {result.total_sales}</div>
          </>
        )}

        {result.message && (
          <div>{result.message}</div>
        )}

        {error && (
          <div>
            <h2>Error</h2>
            <div>{error}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForecastSales;
