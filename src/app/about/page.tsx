import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-100 to-pink-50 p-8">
      <div className="bg-white/80 rounded-2xl shadow-xl max-w-xl w-full p-8 flex flex-col items-center border border-gray-200">
        <div className="w-full mb-6">
          <Image
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"
            alt="Task Manager Illustration"
            width={800}
            height={240}
            className="rounded-xl shadow-lg w-full h-60 object-cover border-4 border-indigo-200"
            priority
          />
        </div>
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-2 text-center tracking-tight">
          About Task Manager
        </h1>
        <p className="text-base text-gray-600 mb-4 text-center">
          <span className="font-semibold text-indigo-600">Task Manager</span> is a
          modern, fullstack Next.js app designed to help you organize, track, and
          manage your daily tasks with ease.
        </p>
        <ul className="text-gray-700 text-sm mb-6 space-y-2 list-disc list-inside">
          <li>✨ Beautiful, responsive UI with instant feedback</li>
          <li>🔒 Confirmation dialogs for safe actions</li>
          <li>⚡ Fast routing and smooth navigation</li>
          <li>🗄️ Built with Next.js, Prisma, and Tailwind CSS</li>
        </ul>
        <div className="text-xs text-gray-400 text-center">
          <span>
            Crafted by your team. 
            <br />
            <span className="italic">Experience productivity, reimagined.
            </span>
          </span>
        </div>
      </div>
    </main>
  );
}