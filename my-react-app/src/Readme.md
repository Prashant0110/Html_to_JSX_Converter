# My React App

This project is a simple React application that utilizes Vite for fast development and Tailwind CSS for styling. The application allows users to convert HTML to JSX by inputting either a URL or raw HTML.

## Features

- Fast development with Vite
- Responsive design using Tailwind CSS
- HTML to JSX conversion via a backend API
- User-friendly interface with copy functionality for the converted JSX

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool and development server for modern web projects.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Axios**: A promise-based HTTP client for making requests to the backend.
- **Express**: A web application framework for Node.js to build the backend API.
- **React Router DOM**: For routing in the React application.
- **CORS**: Middleware for enabling Cross-Origin Resource Sharing.

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js installed on your machine (v14 or later).
- **npm**: Node package manager, which comes with Node.js.

### Installation

1. **Clone the Repository**:
   Clone the repository to your local machine:

   ```bash
   git clone https://github.com/Prashant0110/Html_to_JSX_Converter.git
   ```

2. **Navigate to the Project Directory**:
   Change into the project directory:

   ```bash
   cd my-react-app
   ```

3. **Install the Dependencies**:
   Install the required packages for both the frontend and backend:

   ```bash
   npm install
   ```

   This will install the following packages:

   - **react**: The core library for building user interfaces.
   - **react-dom**: The package that provides DOM-specific methods for React.
   - **vite**: A build tool that provides a fast development environment.
   - **tailwindcss**: A utility-first CSS framework for styling.
   - **axios**: A promise-based HTTP client for making requests.
   - **@vitejs/plugin-react**: A Vite plugin for React support.
   - **postcss**: A tool for transforming CSS with JavaScript plugins.
   - **react-router-dom**: For routing in the React application.
   - **cors**: Middleware for enabling Cross-Origin Resource Sharing.

### Running the Application

1. **Start the Backend Server**:

   - Navigate to the `backend` directory and install the backend dependencies:

   ```bash
   cd backend
   npm install
   ```

   - Start the Express server:

   ```bash
   npm run dev
   ```

   The server will be running on `http://localhost:3000`.

2. **Start the Frontend Application**:

   - Open a new terminal window, navigate back to the `my-react-app` directory, and run:

   ```bash
   npm run dev
   ```

   This will start the Vite development server, typically on `http://localhost:5173`.

### Usage

- Open your browser and navigate to `http://localhost:5173`.
- You will see the HTML to JSX converter interface.
- Input either a URL or raw HTML in the provided fields and click "Convert" to see the converted JSX output.
- You can copy the converted JSX to your clipboard using the "Copy JSX" button.

- **Tailwind CSS**: The project uses Tailwind CSS for styling. The configuration can be found in `tailwind.config.js`.
- **PostCSS**: The PostCSS configuration is located in `postcss.config.cjs`.

### License

This project is licensed under the MIT License.

### Acknowledgments

- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React](https://reactjs.org/)
- [Axios](https://axios-http.com/)
- [Express](https://expressjs.com/)
- [React Router DOM](https://reactrouter.com/)
- [CORS](https://expressjs.com/en/resources/middleware/cors.html)
