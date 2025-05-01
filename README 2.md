# Loghic Merged Application

This is a merged project combining the frontend from the Demo.git repository and the backend API from replit-loghic-API.git into a single unified codebase.

## Project Structure

- `client/` - Contains the React frontend application
- `server/` - Contains the Express.js backend API

## Prerequisites

- Node.js 18+ and npm

## Getting Started

### Installation

1. Install server dependencies:
   ```
   cd merged-project
   npm install
   ```

2. Install client dependencies:
   ```
   cd client
   npm install
   ```

### Running the Application

You can run both the frontend and backend together using:

```
npm run dev
```

This will start:
- The backend server on port 5000
- The frontend development server on port 3000

### Alternative: Using the start script

You can also use the provided start script:

```
./start.sh
```

## Project Details

### Frontend

The frontend is a React application built with:
- Material UI for components and styling
- React Router for navigation
- Chart.js and HighCharts for data visualization
- Axios for API requests

### Backend

The backend is an Express.js API with:
- MongoDB for database storage
- Passport.js for authentication
- RESTful API endpoints for data access
- JWT for secure authentication

## API Endpoints

The backend provides various API endpoints including:
- User authentication (login, register)
- Company data retrieval
- Posts and comments
- Messages and notifications
- Events calendar data
- Financial advisor information

## Environment Variables

Make sure to set up the required environment variables by copying the example files:

```
cp .env.example .env
```

## License

This project is licensed under the ISC License.