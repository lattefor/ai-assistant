import { NextResponse } from 'next/server';
import { openai } from '@/lib/openai';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    console.log("OpenAI API Key:", process.env.OPENAI_API_KEY);
    console.log("Vector Store ID:", process.env.OPENAI_VECTOR_STORE_ID);

    if (!process.env.OPENAI_API_KEY) {
      throw new Error('Missing OPENAI_API_KEY environment variable');
    }

    if (!process.env.OPENAI_VECTOR_STORE_ID) {
      throw new Error('Missing OPENAI_VECTOR_STORE_ID environment variable');
    }

    // Query the vector store for relevant content
    const searchResponse = await fetch(
      `https://api.openai.com/v1/vector_stores/${process.env.OPENAI_VECTOR_STORE_ID}/search`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: message
        })
      }
    );

    if (!searchResponse.ok) {
      const errorText = await searchResponse.text();
      console.error('Search response error:', errorText);
      throw new Error(`Vector store query failed: ${searchResponse.statusText}`);
    }

    const searchResults = await searchResponse.json();
    
    // Construct context from search results
    const context = searchResults.data
      .map((result: any) => result.content)
      .join('\n\n');

    // Create chat completion with context
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are Robbot, an AI assistant specialized in answering questions about SaveABunny. Use the provided knowledge base to answer questions accurately. If the knowledge base doesn't contain relevant information, say so."
        },
        {
          role: "user",
          content: `Context:\n${context}\n\nQuestion: ${message}`
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    return NextResponse.json({
      message: completion.choices[0].message.content
    });
  } catch (error) {
    console.error('Error details:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process request' },
      { status: 500 }
    );
  }
} 