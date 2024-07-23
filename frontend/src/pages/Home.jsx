import React from "react";
import "./Home.css"; // Import the CSS file for Home component

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-section home-text">
        <h2>Demand Forecasting Model for Inventory Management</h2>
        <p>
          Retail organizations often face challenges in accurately predicting
          demand, which can lead to stockouts or excess inventory. Our objective
          is to develop univariate and multivariate forecasting models that
          utilize historical sales data and market trends to provide accurate
          demand forecasts. This will improve inventory management and enhance
          production planning efficiency. Explore our application to see how
          advanced demand forecasting can optimize your retail operations.
        </p>
      </div>
      <div className="home-section home-images">
        <div className="card">
          <img src="/home-img1.jpeg" alt="Description 1" />
          <h3>About Us</h3>
          <p>
            Discover how our cutting-edge demand forecasting models
            revolutionize inventory management. We leverage advanced analytics
            and historical data to provide precise demand predictions, enhancing
            efficiency and reducing stock-related issues for retail businesses.
          </p>
        </div>
        <div className="card">
          <img src="/home-img2.jpeg" alt="Description 2" />
          <h3>Services</h3>
          <p>
            Our services include developing tailored univariate and multivariate
            demand forecasting models, comprehensive inventory management
            solutions, and market trend analysis. We aim to optimize your retail
            operations with accurate demand predictions and efficient inventory
            control.
          </p>
        </div>
        <div className="card">
          <img src="/home-img3.jpg" alt="Description 3" />
          <h3>Contact Us</h3>
          <p>
            Get in touch with us for any inquiries or support. We're here to
            assist you with our demand forecasting solutions and inventory
            management services. Reach out via email, phone, or our online
            contact form for prompt and personalized assistance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
