import React, { useState } from 'react';
import axios from 'axios';

function ModelRetrain() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:5000/retrain', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error retraining model', error);
    }
  };

  return (
    <div>
      <h2>Retrain Model</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Upload and Retrain</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ModelRetrain;
