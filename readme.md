# Week 2 Backend Module Work Completion

This project successfully fulfills the requirements for **Assignment 1 (To-Do List API)**, **Assignment 2 (Authentication System)**, and the **Mini Project (Secure Notes App Backend)**. 

To maximize code efficiency, tasks and notes have been unified into a single database collection architecture secured by JWT authentication.

## Project Structure
- `server.js` - Server initialization & direct local MongoDB connection
- `models/User.js` - User accounts schema with pre-save password encryption
- `models/Note.js` - Data schema for notes/tasks linked to unique user IDs
- `middleware/auth.js` - Guard middleware validating raw JWT authentication signatures
- `routes/auth.js` - REST API endpoints handling user registration & login
- `routes/notes.js` - Secure CRUD routes handling creation, retrieval, updates, and deletion

## Core Features Implemented
1. User Management: Password hashing via BcryptJS & Session security via JWT.
2. Database Connectivity: Direct persistent integration with offline Local MongoDB instance.
3. Full CRUD Capabilities: Validated routes ensuring users can only manage their own records.

Note: Please create a local `.env` file in the root directory with your own `MONGO_URI` and `JWT_SECRET` keys to run this server.

