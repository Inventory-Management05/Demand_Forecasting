import React from 'react';
import './Services.css';

const Services = () => {
  // Replace this URL with your Power BI embed URL or token
  // const powerBiEmbedUrl = 'https://app.powerbi.com/reportEmbed?reportId=3a8beb0b-0be1-4f5f-a5f9-40973c8d7de0&autoAuth=true&ctid=d4963ce2-af94-4122-95a9-644e8b01624d';

  return (
    <div className="services-container">
      <h1 className="services-title">Visualization</h1>
      {/* <div className="services-description">
        <p>We offer a range of services to help you manage your inventory efficiently and forecast demand accurately.</p>
      </div> */}
      <div className="powerbi-container">
      <iframe title="inventory_management data" width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=3a8beb0b-0be1-4f5f-a5f9-40973c8d7de0&autoAuth=true&ctid=d4963ce2-af94-4122-95a9-644e8b01624d" frameborder="0" allowFullScreen="true"></iframe>
      </div>
    </div>
  );
};

export default Services;
