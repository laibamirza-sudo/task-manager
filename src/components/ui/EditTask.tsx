"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Task = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
};

type EditTaskProps = {
  task: Task | null;
  updateTask: (formData: FormData) => Promise<void>;
  onClose: () => void;
};

export default function EditTask({ task, updateTask, onClose }: EditTaskProps) {
  const [title, setTitle] = useState(task?.title || "");

  if (!task) return null;

  return (
    <form
      action={updateTask}
      className="flex gap-2 items-center"
      onSubmit={onClose}
    >
      <input type="hidden" name="id" value={task.id} />
      <Input name="title" value={title} onChange={e => setTitle(e.target.value)} />
      <Button type="submit">Save</Button>
      <Button type="button" variant="secondary" onClick={onClose}>
        Cancel
      </Button>
    </form>
  );
}
