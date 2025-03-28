import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable');
}

if (!process.env.OPENAI_VECTOR_STORE_ID) {
  throw new Error('Missing OPENAI_VECTOR_STORE_ID environment variable');
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const VECTOR_STORE_ID = process.env.OPENAI_VECTOR_STORE_ID; 