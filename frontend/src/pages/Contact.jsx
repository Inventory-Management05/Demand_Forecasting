import React from 'react';
import './Contact.css';

const ContactUs = () => {
  return (
    <div className="contact-container">
      <div className="contact-section team-info">
        <h2 className="contact-text">About Our Team</h2>
        <p className="contact-text">
          We are a dedicated team of professionals committed to providing the best inventory management solutions. Our team combines expertise in data science, software development, and business strategy to deliver accurate demand forecasting and efficient inventory management tools.
        </p>
      </div>
      <div className="contact-section contact-details">
        <h2 className="contact-text">Contact Us</h2>
        <div className="team-members">
          <div className="team-member">
            <h3>Ansh Rajani</h3>
            <p><strong>Role:</strong> Team Lead</p>
            <p><strong>Email:</strong> anshrajani123@gmail.com</p>
          </div>
          <div className="team-member">
            <h3>Aryan Sharma</h3>
            <p><strong>Role:</strong> Web Developer</p>
            <p><strong>Email:</strong> aryanshar17@gmail.com</p>
          </div>
          <div className="team-member">
            <h3>Shivam Sharma</h3>
            <p><strong>Role:</strong> Power BI Integrator</p>
            <p><strong>Email:</strong> shivam.sharma@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;