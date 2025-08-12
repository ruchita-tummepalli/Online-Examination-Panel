# Online Examination Panel

A comprehensive web application for teachers to schedule exams and record marks, built with Angular frontend and Node.js backend.

## Features

- **Authentication**: JWT-based login/logout system
- **Exam Management**: Create, read, update, delete exams
- **Student Management**: Manage student records
- **Marks Recording**: Record and track student marks
- **Dashboard**: Overview with statistics
- **Search & Filter**: Filterable tables for all entities
- **Form Validation**: Client and server-side validation
- **Error Handling**: Graceful error handling with user feedback
- **Logging**: Winston-based logging for backend actions

## Tech Stack

### Frontend
- Angular 17
- Angular Material UI
- TypeScript
- RxJS
- Jasmine/Karma for testing

### Backend
- Node.js with Express
- PostgreSQL database
- JWT authentication
- Winston logging
- Jest for testing
- Joi for validation

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- PostgreSQL
- Angular CLI

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in `.env`:
   ```
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=exam_panel
   DB_USER=postgres
   DB_PASSWORD=your_password
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   ng serve
   ```

4. Open browser to `http://localhost:4200`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Exams
- `GET /api/exams` - Get all exams
- `POST /api/exams` - Create exam
- `PUT /api/exams/:id` - Update exam
- `DELETE /api/exams/:id` - Delete exam

### Students
- `GET /api/students` - Get all students
- `POST /api/students` - Create student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Marks
- `GET /api/marks` - Get all marks
- `POST /api/marks` - Record marks
- `GET /api/marks/exam/:examId` - Get marks by exam
- `DELETE /api/marks/:id` - Delete marks

## Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
ng test
```

## Database Schema

The application uses PostgreSQL with the following tables:
- `users` - Teacher accounts
- `exams` - Exam information
- `students` - Student records
- `marks` - Exam marks/grades

## Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- Protected API routes
- CORS configuration

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request