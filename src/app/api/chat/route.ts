import { NextResponse } from 'next/server';
import { openai } from '@/lib/openai';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    console.log("OpenAI API Key:", process.env.OPENAI_API_KEY);
    console.log("Assistant ID:", process.env.OPENAI_ASSISTANT_ID);

    if (!process.env.OPENAI_API_KEY) {
      throw new Error('Missing OPENAI_API_KEY environment variable');
    }

    if (!process.env.OPENAI_ASSISTANT_ID) {
      throw new Error('Missing OPENAI_ASSISTANT_ID environment variable');
    }

    // Create a thread
    const thread = await openai.beta.threads.create();

    // Add the user's message to the thread
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: message
    });

    // Run the assistant
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: process.env.OPENAI_ASSISTANT_ID
    });

    // Wait for the run to complete
    let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    while (runStatus.status === 'in_progress') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    }

    // Get the assistant's response
    const messages = await openai.beta.threads.messages.list(thread.id);
    const lastMessage = messages.data[0];
    const messageContent = lastMessage.content[0];

    if (messageContent.type !== 'text') {
      throw new Error('Unexpected message content type');
    }

    // Clean up
    await openai.beta.threads.del(thread.id);

    return NextResponse.json({
      message: messageContent.text.value
    });
  } catch (error) {
    console.error('Error details:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process request' },
      { status: 500 }
    );
  }
} 