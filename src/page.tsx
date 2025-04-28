// src/app/page.tsx

import dbConnect from "@/lib/dbConnect";

export default async function HomePage() {
  // Connect to MongoDB
  await dbConnect();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">Personal Finance Visualizer</h1>
      <p className="text-lg text-gray-600">
        Welcome! Track your budgets and transactions easily.
      </p>
    </main>
  );
}
