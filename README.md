# Bus System Backend

This is the backend for the Bus System application. Below is an overview of the project structure and the purpose of each directory:

## Project Structure
```
├── config/                         # Configuration files for the application 
│ │
│ └── database.js                   # Database connection and configuration 
│ 
├── controllers/                    # Handles the business logic for different routes
│ │ 
│ ├── adminController.js            # Logic for admin-related operations 
│ │
│ ├── authController.js             # Logic for authentication and authorization
│ │ 
│ ├── driverController.js           # Logic for driver-related operations
│ │
│ └── studentController.js          # Logic for student-related operations
│
├── middleware/                     # Custom middleware for the application
│ │ 
│ ├── authMiddleware.js             # Middleware for authentication 
│ │
│ └── errorHandler.js               # Middleware for handling errors 
│
├── models/                         # Database models representing entities 
│ │
│ ├── Booking.js                    # Model for bookings 
│ │
│ ├── Bus.js                        # Model for buses 
│ │
│ ├── Seat.js                       # Model for seats
│ │ 
│ └── User.js                       # Model for users 
│
├── public/                         # Publicly accessible files 
│ │
│ └── uploads/                      # Directory for uploaded files 
│
├── routes/                         # Defines API routes 
│ │
│ ├── adminRoutes.js                # Routes for admin-related operations 
│ │
│ ├── authRoutes.js                 # Routes for authentication 
│ │
│ ├── driverRoutes.js               # Routes for driver-related operations 
│ │
│ └── studentRoutes.js              # Routes for student-related operations 
│
├── services/                       # Services for reusable business logic 
│ │
│ └── emailService.js               # Service for sending emails 
│ 
├── utils/                          # Utility functions and helpers 
│ │
│ └── helpers.js                    # General-purpose helper functions
│
├── .gitignore                      # Specifies files and directories to be ignored by Git 
│
├── package.json                    # Contains project metadata and dependencies 
│
├── server.js                       # Entry point of the application 
│
├── README.md                       # Project documentation 
```
Start the server:
npm start
The server will run on http://localhost:5000 by default.


This structure provides a clear explanation of each directory and file in your project.
