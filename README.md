# UNICEF Frontend Application

This project contains the UNICEF Geospatial Analysis Assistant frontend application, migrated from the unicef-geospatial/frontend project with login functionality removed.

## Features

- **Chat Interface**: Natural language interaction with the UNICEF Geospatial Assistant
- **Map Visualization**: Interactive maps displaying geospatial data
- **Tool Calls**: View backend processing steps and tool calls
- **User Guide**: Built-in documentation and examples
- **Thinking Mode**: See assistant reasoning process
- **Feedback System**: Rate assistant responses using Langfuse

## Technology Stack

- **React 19** with TypeScript
- **Vite** for build tooling
- **Langfuse** for feedback and analytics
- **React Markdown** for message rendering

## Project Structure

```
src/
├── components/           # React components
│   ├── ChatMessages.tsx  # Chat message display
│   ├── ChatSection.tsx   # Main chat interface
│   ├── InputContainer.tsx # Message input
│   ├── MapContainer.tsx  # Map visualization
│   ├── TabNav.tsx        # Tab navigation
│   ├── ToolCallsSection.tsx # Tool calls display
│   └── UserGuide.tsx     # User documentation
├── types/               # TypeScript type definitions
│   └── Message.tsx      # Message interface
├── utils/               # Utility functions
│   └── constants.ts     # API constants
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles
```

## Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Start development server**:

   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## Environment Variables

The application expects the following environment variables:

- `VITE_LANGFUSE_PUBLIC_KEY`: Public key for Langfuse integration
- `VITE_BACKEND_URL`: URL of the backend API (optional)

## API Integration

The application communicates with the backend through:

- **POST /api/ask**: Submit questions and receive streaming responses
- Supports both thinking and final responses
- Real-time map HTML content updates
- Tool call tracking

## Migration Notes

This project was migrated from `unicef-geospatial/frontend` with the following changes:

- **Removed**: All authentication-related functionality

  - Login component
  - AuthService
  - Authentication types
  - Auth-related API calls

- **Preserved**: All core functionality
  - Chat interface
  - Map visualization
  - Tool calls display
  - User guide
  - Feedback system
  - Streaming responses

The application now runs without authentication requirements, making it suitable for public access or integration with different authentication systems.
