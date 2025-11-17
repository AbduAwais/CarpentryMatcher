# Carpentry Matcher Frontend

Frontend application for the Carpentry Matcher project. Built with React, TypeScript, and Vite.

## Features

- Search for carpenters by location (city/postcode)
- Filter carpenters by job description/specialties
- View carpenter details including contact information and ratings

## Development

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

```bash
npm install
```

### Running the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## Tech Stack

- React 18
- TypeScript
- Vite
- ESLint for code quality

## API Configuration

The frontend connects to the backend API at `http://localhost:5000`. Make sure the backend is running before starting the frontend.


export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
