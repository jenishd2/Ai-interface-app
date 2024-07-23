# Chat AI Interface with Backend and Frontend

This project is a comprehensive AI chat interface that leverages the Gemini AI API for intelligent responses. It includes user authentication (signup/login) and data storage functionalities.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Introduction

This project is designed to provide a robust AI chat interface with full-stack capabilities, incorporating user authentication and data management. It demonstrates the integration of a frontend UI with a backend server, interfacing with the Gemini AI API for enhanced AI responses.

## Features

- User Signup/Login
- Data Storage and Retrieval
- Integration with Gemini AI API
- Secure Authentication

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript, React
- **Backend:** Node.js, Express
- **Database:** MongoDB (or any other database you are using)
- **API:** Gemini AI API

## Setup and Installation

Follow these steps to set up and run the project locally.

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Steps

1. **Clone the Repository**

    ```bash
    git clone https://github.com/jenishd2/Ai-interface-app.git
    cd Ai-interface-app
    ```

2. **Install Backend Dependencies**

    ```bash
    cd backend
    npm install
    ```

3. **Configure Environment Variables**

- i have already Give .env.sample file in backend so you have to create .env file and add your api keys and mongodb link

4. **Start the Backend Server**

    ```bash
    npm start
    ```

5. **Install Frontend Dependencies**

    ```bash
    cd ../frontend
    npm install
    ```
6. **Start the Frontend Server**

    ```bash
    npm run dev
    ```

## Usage

1. Open your browser and navigate to `http://localhost:5173/login`.
2. Signup or login to your account.
3. Use the chat interface to interact with the AI, backed by the Gemini API.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License.

## Acknowledgements

- [Gemini AI](https://www.gemini.com) for their powerful API
- [React](https://reactjs.org) for the frontend framework
- [Node.js](https://nodejs.org) and [Express](https://expressjs.com) for the backend framework
- [MongoDB](https://www.mongodb.com) for the database
