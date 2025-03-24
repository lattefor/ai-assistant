'use client';

import ChatInterface from '@/components/ChatInterface';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Build with AI</h1>
          <p className="text-xl text-purple-300">Ask questions about SaveABunny</p>
        </header>
        <div className="max-w-3xl mx-auto">
          <ChatInterface />
        </div>
      </div>
    </main>
  );
}
