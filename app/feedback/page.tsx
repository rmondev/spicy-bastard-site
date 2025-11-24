import React from 'react'

const Feedback = () => {
  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-16">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-4">
          Feedback
        </h1>
        <p className="text-center text-sm text-zinc-600 mb-8">
          Help me improve Tropical Menace by answering a few quick questions.
        </p>

        {/* Carousel form will go here */}
        <div className="border rounded-xl p-6 bg-white shadow-sm">
          <p className="text-sm text-zinc-500 text-center">
            [Feedback carousel coming soon]
          </p>
        </div>
      </div>
    </main>
  );
}

export default Feedback
