# ProjectFlow - Project Tracking System

A full-stack project management application built with Node.js/Express and React.

## 🚀 Features

- **CRUD Operations**: Create, read, update status, and delete projects
- **Advanced Filtering**: Search by project/client name, filter by status, sort by date
- **Status Transitions**: Enforced business rules (active→on_hold|completed, etc.)
- **Soft Delete**: Projects are archived, not permanently removed
- **Responsive Design**: Desktop table view, mobile card view
- **Dark Mode**: Animated theme toggle with wave-ripple transition effect
- **State Management**: Loading, empty, error, and no-results states
- **Optimistic Updates**: Instant UI feedback with rollback on error
- **Debounced Search**: 300ms delay to reduce API calls

## 📋 Prerequisites

- Node.js 18+ and npm
- Git

## 🛠️ Setup Instructions

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start development server
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on `http://localhost:5173`

## 📚 API Documentation

Base URL: `http://localhost:5000/api`

### Endpoints

#### Create Project
```
POST /projects
Content-Type: application/json

Body:
{
  "name": "Website Redesign",
  "clientName": "Acme Corp",
  "status": "active",
  "priority": "high",
  "startDate": "2024-01-15",
  "endDate": "2024-03-30",
  "notes": "Complete redesign of company website"
}

Response: 201 Created
{
  "id": 1,
  "name": "Website Redesign",
  "clientName": "Acme Corp",
  "status": "active",
  "priority": "high",
  "startDate": "2024-01-15",
  "endDate": "2024-03-30",
  "notes": "Complete redesign of company website",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z",
  "deletedAt": null
}
```

#### List Projects
```
GET /projects?status=active&search=website&sortBy=createdAt&sortOrder=desc&page=1&limit=10

Response: 200 OK
{
  "projects": [...],
  "total": 24,
  "page": 1,
  "limit": 10,
  "totalPages": 3
}
```

**Query Parameters:**
- `status`: `active`, `on_hold`, `completed` (optional)
- `search`: Search in project name or client name (optional)
- `sortBy`: `createdAt`, `startDate` (default: `createdAt`)
- `sortOrder`: `asc`, `desc` (default: `desc`)
- `page`: Page number (default: `1`)
- `limit`: Items per page (default: `10`, max: `100`)

#### Get Project by ID
```
GET /projects/:id

Response: 200 OK
{
  "id": 1,
  "name": "Website Redesign",
  ...
}

Error: 404 Not Found
{
  "error": "Project not found"
}
```

#### Update Project Status
```
PATCH /projects/:id/status
Content-Type: application/json

Body:
{
  "status": "on_hold"
}

Response: 200 OK
{
  "id": 1,
  "status": "on_hold",
  "updatedAt": "2024-01-16T14:20:00.000Z",
  ...
}

Error: 400 Bad Request
{
  "error": "Invalid status transition: cannot change from \"completed\" to \"active\". Allowed transitions: none"
}
```

**Status Transition Rules:**
- `active` → `on_hold`, `completed`
- `on_hold` → `active`, `completed`
- `completed` → (no transitions allowed)

#### Delete Project
```
DELETE /projects/:id

Response: 200 OK
{
  "message": "Project deleted successfully"
}

Error: 404 Not Found
{
  "error": "Project not found"
}
```

## 🔐 Validation Rules

### Project Creation
- **name**: Required, min 1 character
- **clientName**: Required, min 1 character
- **status**: Required, enum (`active`, `on_hold`, `completed`)
- **priority**: Required, enum (`low`, `medium`, `high`), default: `medium`
- **startDate**: Required, ISO date string
- **endDate**: Optional, ISO date string, must be ≥ startDate
- **notes**: Optional, string

### Status Update
- Must follow valid transition rules (see API docs above)
- Completed projects cannot change status

## 🏗️ Architecture

### Backend Structure
```
backend/
├── src/
│   ├── config/
│   │   └── database.js         # SQLite setup & schema
│   ├── models/
│   │   └── Project.js          # Data access layer
│   ├── services/
│   │   └── projectService.js   # Business logic
│   ├── controllers/
│   │   └── projectController.js # HTTP handlers
│   ├── routes/
│   │   └── projectRoutes.js    # Route definitions
│   ├── middleware/
│   │   └── errorHandler.js     # Global error handling
│   ├── validators/
│   │   └── projectValidator.js # Zod schemas
│   └── server.js               # Express app
├── database/
│   └── projects.db             # SQLite database (auto-generated)
└── package.json
```

### Frontend Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── common/             # Reusable UI components
│   │   ├── layout/             # Layout components
│   │   ├── projects/           # Project-specific components
│   │   ├── modals/             # Modal dialogs
│   │   └── states/             # Loading/Error/Empty states
│   ├── hooks/                  # Custom React hooks
│   ├── services/               # API client
│   ├── pages/                  # Page components
│   └── utils/                  # Utility functions
└── package.json
```

## 📊 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express 5
- **Database**: SQLite (better-sqlite3)
- **Validation**: Zod
- **Middleware**: CORS, dotenv

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS
- **Date Handling**: date-fns
- **Icons**: Material Icons

## 🎯 Assumptions & Trade-offs

### Assumptions
1. **No Authentication**: User management is out of scope. All users can access all projects.
2. **Single Tenant**: No multi-tenancy or workspace isolation.
3. **Soft Delete Only**: Deleted projects remain in database with `deletedAt` timestamp.
4. **Priority Field**: Added as justified optional field (Low/Medium/High) for better project management.
5. **Pagination**: Default 10 items per page, configurable via query param.
6. **Search**: Case-insensitive, searches both `name` and `clientName`.
7. **No Real-time Updates**: No WebSocket/SSE for live updates. Users must refresh manually.

### Trade-offs

#### 1. Pagination vs Infinite Scroll
- **Chosen**: Pagination
- **Reason**: Better for table view, clearer navigation, easier to implement
- **Trade-off**: Infinite scroll better for mobile feeds but adds complexity

#### 2. Optimistic Updates
- **Chosen**: Optimistic status updates with rollback
- **Reason**: Better perceived performance, instant feedback
- **Trade-off**: Temporary inconsistency if API fails (mitigated by rollback)

#### 3. Debounced Search
- **Chosen**: 300ms debounce
- **Reason**: Reduces API calls, improves performance
- **Trade-off**: Slight delay in search results

#### 4. SQLite vs Postgres
- **Chosen**: SQLite
- **Reason**: Simpler setup, no external dependencies, file-based
- **Trade-off**: Not suitable for production scale (can migrate to Postgres later)

#### 5. Monorepo Structure
- **Chosen**: Monorepo (backend/ and frontend/ folders)
- **Reason**: Easier to manage for single developer, shared documentation
- **Trade-off**: Harder to deploy independently (would need workspace tools like Nx/Turborepo for production)

#### 6. Tailwind vs CSS Modules
- **Chosen**: Tailwind
- **Reason**: Matches design files, faster development, utility-first
- **Trade-off**: Larger HTML, learning curve for new developers

#### 7. Status-Only Update Endpoint
- **Chosen**: Separate endpoint for status updates (`PATCH /projects/:id/status`)
- **Reason**: Enforces status transition rules, clear intent
- **Trade-off**: Need separate endpoint for editing other fields (could add `PATCH /projects/:id` later)

## 🤖 AI Usage Disclosure

### AI Tools Used
1. **Gemini 3 Flash**: Frontend component implementation and styling also stich for design
2. **Claude**: Backend architecture, documentation, and project planning

### What AI Generated
1. **Backend**: Database schema, routes, controllers, services, validation
2. **Frontend**: React components, hooks, API services, Tailwind styling
3. **Documentation**:
   - README structure and API documentation

### Testing & Refinement
- Manual testing of all CRUD operations
- Edge case handling (null checks, pagination boundaries, invalid transitions)
- Security fixes (SQL injection prevention, input sanitization)
- Performance optimizations (debounced search, memoized callbacks)

### Technical Decisions
All architectural choices, trade-offs, and implementation strategies were made after analyzing requirements and evaluating alternatives. The codebase reflects understanding of full-stack development patterns, REST API design, React best practices, and accessibility standards.

## 🧪 Testing

### Manual Testing
All endpoints and UI flows have been manually tested and verified working correctly. See API Documentation section above for endpoint usage examples.

## 🚀 Deployment

### Live Demo
**Frontend**: [https://frontend-two-swart-52.vercel.app](https://frontend-two-swart-52.vercel.app)

### Backend (Example: Railway/Render)
1. Add environment variables: `PORT`, `NODE_ENV=production`
2. Build command: `npm install`
3. Start command: `npm start`
4. Add PostgreSQL if needed (migrate from SQLite)

### Frontend (Vercel)
Deployed using Vercel CLI:
```bash
cd frontend
vercel --prod
```
Configuration in `vercel.json`

## 📝 License

MIT

## 👤 Author

**Utsav Mishra**
Developed as part of a full-stack developer assessment.
