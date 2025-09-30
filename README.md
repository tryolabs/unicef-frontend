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
- **Framer Motion** for animations
- **Lucide React** for icons

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
│   ├── UserGuide.tsx     # User documentation
│   ├── MessageBubble.tsx # Individual message rendering
│   ├── FeedbackButtons.tsx # User feedback interface
│   ├── ExampleQuestions.tsx # Quick-start questions
│   └── ResizableLayout.tsx # Responsive layout management
├── types/               # TypeScript type definitions
│   └── Message.tsx      # Message interface
├── hooks/               # Custom React hooks
│   ├── useChat.ts       # Chat state management
│   └── useFeedback.ts   # Feedback functionality
├── contexts/            # React contexts
│   └── AuthContext.tsx  # Authentication context
├── utils/               # Utility functions
│   └── constants.ts     # API constants
├── styles/              # CSS and styling
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles
```

## Getting Started

### Prerequisites

- **Node.js**: Version 22
- **npm**: Version 10 (comes with Node.js)

### Installation

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Start development server**:

   ```bash
   npm run dev
   ```

3. **Access the application**:
   - Development: `http://localhost:5173`
   - The port may vary if 5173 is occupied

## API Integration

The application communicates with the backend through Nginx proxying `/api/*` to the agent service:

### Main Endpoint

**POST `/api/ask`**: Submit questions and receive streaming responses (proxied to the agent `/ask` endpoint)

**Request Format**:

```typescript
{
  chat_messages: Message[];
  session_id: string;
}

interface Message {
  content: string;
  role: "user" | "assistant";
  trace_id?: string;
  is_thinking?: boolean;
  is_finished?: boolean;
}
```

**Response Format** (Streaming):

```typescript
// Thinking stream chunk
{
  response: string;
  is_thinking: true;
  trace_id: string;
  is_finished: boolean;
}

// Tool call chunk
{
  tool_call: {
    name: string;
    args: Record<string, any>;
  }
  trace_id: string;
}

// Final response chunk
{
  response: string;
  is_thinking: false;
  trace_id: string;
  is_finished: true;
}

// Map content chunk
{
  html_content: string;
  trace_id: string;
}
```

## Support

- **Issues**: Submit issues on GitHub repository
- **React Documentation**: [React Official Docs](https://react.dev/)
- **Vite Documentation**: [Vite Build Tool](https://vitejs.dev/)
- **TypeScript Guide**: [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- **Technical Support**: Repository maintainers
