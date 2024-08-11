# Project Repository

This repository contains Node.js projects built with TypeScript, demonstrating clean architecture principles, clean code, and minimal setups.

## Projects

1. **users-simple-app**
A demo project that implements Clean Architecture using TypeScript, Node.js, Express, and MongoDB. This project also includes unit and integration tests to ensure code reliability.

### Folder Structure

```bash
📁users-simple-app
├── 📁__tests__
│   └── user.test.ts                # Unit and integration tests for user functionalities
├── 📁src
│   ├── 📁controllers
│   │   └── user-controller.ts      # Controllers handle incoming requests
│   ├── 📁models
│   │   └── userModel.ts            # User model schema for MongoDB
│   ├── 📁routes
│   │   └── user-routes.ts          # Routes for user-related endpoints
│   ├── 📁services
│   │   └── user-service.ts         # Business logic for user management
│   ├── 📁types
│   │   └── user-type.ts            # TypeScript types and interfaces
│   ├── 📁utils
│   │   └── http-exception.ts       # Custom HTTP exceptions
│   ├── app.ts                      # Express app setup
│   ├── database.ts                 # MongoDB connection setup
│   └── server.ts                   # Server startup script
├── .env.example                    # Environment variables
├── .gitignore                      # Git ignore file
├── jest.config.js                  # Jest configuration
├── jest.setup.ts                   # Jest setup file
├── package-lock.json               # Lock file for package dependencies
├── package.json                    # Project dependencies and scripts
└── tsconfig.json     
```

### Getting Started

Install Dependencies:

```bash
cd users-simple-app
npm install
```

Set Up Environment Variables:

Create a .env.local file based on the .env.example and fill in your environment variables.
Run the Application:

```bash
npm start
```

Run Tests:

```bash
npm test
```

2. **minimal-node-typescript-server**
A minimal Node.js server using TypeScript without any frameworks, focusing on a basic server-client setup.

### Folder Structure

```bash
📁minimal-node-typescript-server
├── 📁src
│   ├── client.ts                   # Client logic
│   └── server.ts                   # Basic server implementation
├── .gitignore                      # Git ignore file
├── package.json                    # Project dependencies and scripts
└── tsconfig.json                   # TypeScript configuration
```

### Getting Started

Install Dependencies:

```bash
cd minimal-node-typescript-server
npm install
```

Run the Application:

```bash
npm start
```
