import React, { useState } from 'react';
import './InputData.css';

const InputData = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (file) {
      // Handle the file upload here (e.g., send it to a server or process it)
      console.log('File uploaded:', file);
    } else {
      alert('Please upload a file.');
    }
  };

  return (
    <div className="input-data-container">
      <div className="input-data-section">
        <h2 className="input-data-text">Upload Your Data File</h2>
        <form className="input-data-form" onSubmit={handleSubmit}>
          <input type="file" accept=".csv, .xlsx" onChange={handleFileChange} />
          <button type="submit">Upload</button>
        </form>
        {file && <p className="input-data-text">Selected file: {file.name}</p>}
      </div>

      <div className="input-data-section rules-section">
        <div className="rules-text">
          <h2>File Upload Rules</h2>
          <ul>
            <li>The file must be in CSV or XLSX format.</li>
            <li>The file should not exceed 5MB in size.</li>
            <li>Ensure that the file contains no special characters in headers.</li>
            <li>Follow the template provided for the data structure.</li>
          </ul>
        </div>
        <div className="rules-image">
          <img src="/input-data-img1.png" alt="Rules Illustration" />
        </div>
      </div>
    </div>
  );
};

export default InputData;
