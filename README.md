# Robbot - SaveABunny AI Assistant

A Next.js application that provides an AI-powered chatbot interface for answering questions about SaveABunny using OpenAI's Vector Store API.

## Features

- Dark mode UI with lavender accents
- Real-time chat interface
- Vector store-based knowledge retrieval
- GPT-4 Turbo powered responses
- Responsive design

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **AI/ML**: 
  - OpenAI API (GPT-4 Turbo)
  - OpenAI Vector Store API
- **Type Safety**: TypeScript

## Prerequisites

- Node.js 18+ 
- OpenAI API key
- OpenAI Vector Store ID

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
OPENAI_API_KEY=your_openai_api_key
OPENAI_VECTOR_STORE_ID=your_vector_store_id
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts    # API route for chat functionality
│   └── page.tsx           # Main page component
├── components/
│   └── ChatInterface.tsx  # Chat UI component
└── lib/
    └── openai.ts         # OpenAI client configuration
```

## API Endpoints

### POST /api/chat

Handles chat messages and returns AI responses using the Vector Store API.

Request body:
```json
{
  "message": "Your question here"
}
```

Response:
```json
{
  "message": "AI response here"
}
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## License

MIT
