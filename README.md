# Calendar Project

This is a full-stack Calendar application that allows users to create, view, edit, and delete events/meetings on their personal calendar. The project is built using **React** for the frontend and **Node.js/Express** for the backend with **MSSQL** as the database.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Running the Project](#running-the-project)
- [Folder Structure](#folder-structure)
- [License](#license)

## Features

- Create, update, and delete calendar events.
- View events on a selected date.
- Persistent data storage using MSSQL.
- Separate frontend and backend environments.

## Installation

Follow the steps below to get the project running on your local machine.

### 1. Clone the Repository

```bash
git clone <repository-url>

### 2. Backend Setup
### - Navigate to the backend/config/database.js file. You need to configure your MSSQL connection here. Replace the existing configuration with your own MSSQL database details.

#-run this command in your terminal
cd backend
npm install

### -Once the dependencies are installed, start the backend server by running:
node index.js

### 3. Frontend Setup
### - Navigate to the Frontend Folder
### - Go to the frontend folder:
cd frontend

###-Install the necessary dependencies for the frontend by running the following command:
npm install

### -Once the dependencies are installed, start the frontend development server by running:
npm start
```
