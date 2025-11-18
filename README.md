# Project Description
AI-powered platform that helps people in Denmark quickly find the right carpenter for their project. Users describe the work they need (like “I want to build a terrace”), and the platform shows nearby carpenters who specialize in that exact type of job — with their phone number, city, and skills clearly visible so users can contact them directly.



# Carpentry Matcher

A full-stack application with a .NET 8 API backend and React + Vite frontend.

## Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js)

## Project Structure

```
carpentry-matcher/
├── src/
│   └── CarpentryMatcher.Api/     # .NET 8 Web API
└── frontend/
    └── carpentrymatcherfrontend/  # React + Vite frontend
```

## Running the Backend (API)

1. Navigate to the API directory:
   ```bash
   cd src/CarpentryMatcher.Api
   ```

2. Restore dependencies:
   ```bash
   dotnet restore
   ```

3. Run the API:
   ```bash
   dotnet run
   ```

The API will start on `https://localhost:5001` (or `http://localhost:5000`).

### API Features
- Swagger UI available at `https://localhost:5001/swagger` in development mode
- CORS enabled for frontend integration

## Running the Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend/carpentrymatcherfrontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will start on `http://localhost:5173` (default Vite port).

### Frontend Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Running Both Services

To run the full application, you'll need to start both services in separate terminals:

**Terminal 1 (Backend):**
```bash
cd src/CarpentryMatcher.Api
dotnet run
```

**Terminal 2 (Frontend):**
```bash
cd frontend/carpentrymatcherfrontend
npm run dev
```

## Building for Production

### Backend
```bash
cd src/CarpentryMatcher.Api
dotnet publish -c Release
```

### Frontend
```bash
cd frontend/carpentrymatcherfrontend
npm run build
```

The production build will be in the `dist/` directory.

