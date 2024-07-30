# Inventory Management Project

This project is an inventory management system with a React frontend and a Flask backend. Follow the steps below to set up and run the project on your local machine.

## Prerequisites

Make sure you have the following installed on your system:
- Node.js and npm
- Python and pip

## Steps to Run the Project

1. **Fork and Clone the Repository**

   - Fork the repository to your GitHub account.
   - Clone the forked repository to your local system:
     ```bash
     git clone https://github.com/your-username/inventory-management05.git
     ```
   - Navigate into the project directory:
     ```bash
     cd inventory-management05
     ```

2. **Install Node Modules**

   - Navigate to the frontend directory:
     ```bash
     cd frontend
     ```
   - Install the required node modules:
     ```bash
     npm install
     ```
   - Install Vite and its React plugin:
     ```bash
     npm install vite @vitejs/plugin-react
     ```

3. **Install Python Requirements**

   - Navigate to the backend directory:
     ```bash
     cd ../backend
     ```
   - Install the Python dependencies from the `requirements.txt` file:
     ```bash
     pip install -r requirements.txt
     ```

4. **Run the Backend and Frontend**

   - Open two terminal windows or split the terminal.
   - In the first terminal, navigate to the backend directory and run the Flask application:
     ```bash
     cd backend
     python app_test.py
     ```
   - In the second terminal, navigate to the frontend directory and start the Vite development server:
     ```bash
     cd ../frontend
     npm run dev
     ```

Now, you should have both the backend and frontend running.

## Additional Information

- **Backend**: The Flask backend handles the API endpoints for sales prediction and model retraining.
- **Frontend**: The React frontend provides a user interface for interacting with the inventory management system.

