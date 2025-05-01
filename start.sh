#!/bin/bash

# Navigate to the project directory
cd $(dirname "$0")

# Install dependencies if needed
echo "Installing dependencies..."
npm install
cd client && npm install && cd ..

# Start the application
echo "Starting the application..."
npm run dev