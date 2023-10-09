# MERN Task Management App

A To-do List application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack

## Features

- **Viewing tasks** - tasks are shown to the user in a responsive and easy to understand interface, with the task name, label (stylised as a hashtag) and task priority respectively
- **Add new tasks**
- **Delete tasks** - users can delete specific tasks by clicking on the trash can icon.
- **Edit tasks** - 
- **Task completion** - clicking the checkbox allows the user to remove a 

## Technologies Used

- **Front-End:** HTML, CSS, JavaScript, React.js
- **Back-End:** Node.js, Express.js, MongoDB

## Functionality

**Server-Side Framework**:
  - The application utilizes Node.js and Express.js to handle data storage and retrieval.

**API Endpoints**:
  - CRUD operations (create, read, update, delete) for tasks are managed through API endpoints (`routes/taskRoutes.js`).

 **Data Storage and Persistences**:
  - MongoDB is used as the database system, providing a cloud-based NoSQL solution for storing data. Through MongoDB, persistence for tasks is also ensured between sessions, remaining upon refresh or a new browser instance.

**Error Handling**:
  - The use of both visual error queues (e.g. indicating to the user that a required field is empty) and console logging is used throughout the project.

## Before using the database

MongoDB was used to handle the backend throughout this project - for security reasons the MongoDB connection string is set as an environment variable. For personal use, please follow this tutorial (https://www.mongodb.com/docs/guides/atlas/connection-string/) and replace the existing connection string with the one found in your mongoDB cluster.

## Getting Started

1. Clone the repository:

```
git clone https://github.com/adamrugg/betsson-challenge
```

2. Install dependencies for the backend:

```
cd backend
npm i
```

3. Start the server:

```
npm run dev
```

4. Install dependencies for the frontend:

```
cd ../frontend
npm i
```

5. Start the client:

```
npm run dev
```

## Configuration

- Database connection configuration is located in `backend/config.js`.
- API endpoints are defined in `backend/routes/taskRoutes.js`.
- React components are located in `frontend/src/`.

## Usage

1. Open the application in your browser (localhost:5173).
2. Create a task by pressing the Add a new Task button and filling in all the required fields.
3. Edit or delete an existing task by pressing the relating icons.
4. Mark a task as completed or incomplete by checking or unchecking the tick-box.