"use client";

import { useState } from "react";

export function useToaster() {
  const [message, setMessage] = useState<string | null>(null);

  function show(msg: string) {
    setMessage(msg);
    setTimeout(() => setMessage(null), 2500);
  }

  return { message, show };
} 

export default function Toaster({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded shadow-lg z-50">
      {message}
    </div>
  );
}