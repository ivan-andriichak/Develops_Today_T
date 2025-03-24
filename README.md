# Recipe Book

## Overview
This project is a full-stack application for browsing and managing recipes, built as a test assessment for a Full-Stack JS Engineer position. It consists of:
- **Backend**: A Node.js application using Nest.js, fetching data from [TheMealDB API](https://www.themealdb.com/api.php).
- **Frontend**: A React.js application with TypeScript for displaying recipe lists and details.

The backend provides RESTful endpoints with filtering capabilities, while the frontend offers a user-friendly interface to explore recipes.

## Project Structure
- `backend/`: Contains the Nest.js backend application.
- `frontend/`: Contains the React.js frontend application.
- `README.md`: Project documentation.

## Setup

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/recipe-book.git
    cd recipe-book
    ```

2. Navigate to the `backend` folder, install dependencies, and start the server:
    ```bash
    cd backend
    npm install
    npm run start
    ```

3. Navigate to the `frontend` folder, install dependencies, and start the development server:
    ```bash
    cd ../frontend
    npm install
    npm start
    ```

## Usage

### Backend
- The backend server will run on `http://localhost:3000`.
- Use Postman or curl to test endpoints:
    ```bash
    curl http://localhost:3000/recipes
    curl http://localhost:3000/recipes?category=Seafood
    curl http://localhost:3000/recipes/53086
    ```
- Check Swagger UI at `http://localhost:3005/docs` for interactive testing.

### Frontend
- The frontend application will run on `http://localhost:3001`.
- Open `http://localhost:3001` in your browser and navigate through the UI.
- Test filters: `http://localhost:3001/?ingredient=chicken_breast`.
- Click a recipe to view details.

## Testing
- Backend: Use Postman or curl to test endpoints.
- Frontend: Open the application in your browser and navigate through the UI.

