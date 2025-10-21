"use server";

import { prisma } from "@/lib/prisma";
import {
  createTask,
  updateTask,
  toggleTask,
  deleteTask,
} from "./actions/taskActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import TaskList from "@/components/ui/TaskList";

type Task = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string; // Change to string
};

export default async function HomePage() {
  const tasksRaw = await prisma.task.findMany({ orderBy: { createdAt: "desc" } });
  // Format createdAt as ISO string
  const tasks: Task[] = tasksRaw.map(task => ({
    ...task,
    createdAt: task.createdAt.toISOString(),
  }));

  return (
    <main className="min-h-screen p-8 flex flex-col items-center gap-8 bg-gradient-to-br from-gray-50 to-gray-200">
      <h1 className="text-3xl font-bold text-gray-800">Task Manager</h1>
      <Card className="w-full max-w-xl p-6 shadow-lg">
        <form action={createTask} className="flex gap-2">
          <Input name="title" placeholder="Add a new task..." />
          <Button type="submit">Add</Button>
        </form>
      </Card>
      <TaskList
        tasks={tasks}
        updateTask={updateTask}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
      />
    </main>
  );
}
