"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import EditTask from "@/components/ui/EditTask";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Toaster, { useToaster } from "@/components/ui/Toaster";

type Task = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
};

type TaskListProps = {
  tasks: Task[];
  updateTask: (formData: FormData) => Promise<void>;
  toggleTask: (formData: FormData) => Promise<void>;
  deleteTask: (formData: FormData) => Promise<void>;
};

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toISOString().replace("T", " ").substring(0, 19);
}

export default function TaskList({
  tasks,
  updateTask,
  toggleTask,
  deleteTask,
}: TaskListProps) {
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { message, show } = useToaster();

  async function handleDelete(taskId: number) {
    const formData = new FormData();
    formData.append("id", String(taskId));
    await deleteTask(formData);
    show("Task deleted!");
  }

  return (
    <>
      <Toaster message={message} />
      <div className="w-full max-w-xl space-y-4">
        {tasks.length === 0 && (
          <Card className="p-4 text-center text-gray-500">No tasks yet!</Card>
        )}
        {tasks.map((task) => (
          <Card
            key={task.id}
            className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow"
          >
            <div className="flex items-center gap-3 w-full">
              <form action={toggleTask}>
                <input type="hidden" name="id" value={task.id} />
                <input type="hidden" name="completed" value={String(!task.completed)} />
                <Button
                  type="submit"
                  variant={task.completed ? "secondary" : "outline"}
                  className="min-w-[2.5rem]"
                >
                  {task.completed ? "☑" : "☐"}
                </Button>
              </form>
              <div className="flex flex-col">
                <span className={`font-medium ${task.completed ? "line-through text-gray-400" : ""}`}>
                  {task.title}
                </span>
                <span className="text-xs text-gray-400">
                  {formatDate(task.createdAt)}
                </span>
              </div>
              <span className={`ml-2 px-2 py-1 rounded text-xs ${task.completed ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                {task.completed ? "Done" : "Pending"}
              </span>
            </div>
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" onClick={() => setEditingTask(task)}>
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Edit Task</DialogTitle>
                  <DialogDescription>Update your task details below.</DialogDescription>
                  <EditTask
                    task={editingTask}
                    updateTask={updateTask}
                    onClose={() => setEditingTask(null)}
                  />
                </DialogContent>
              </Dialog>
              <ConfirmDialog
                trigger={<Button variant="destructive">Delete</Button>}
                title="Delete Task"
                description="Are you sure you want to delete this task? This action cannot be undone."
                onConfirm={() => handleDelete(task.id)}
              />
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}