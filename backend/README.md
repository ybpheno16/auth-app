# Backend

This is the backend for the authentication application. It is built with Node.js, Express, and MongoDB.

## Prerequisites

- Node.js
- npm
- MongoDB

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ybpheno16/auth-app.git
   ```
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the `backend` directory and add the following environment variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

## Running the server

To run the server in development mode (with nodemon), use the following command:

```bash
npm run dev
```

To run the server in production mode, use the following command:

```bash
npm start
```

The server will start on the port specified in your `.env` file (e.g., `http://localhost:5000`).

## API Endpoints

- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Log in an existing user.
