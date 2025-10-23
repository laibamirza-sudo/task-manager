import { NextRequest } from "next/server";
import {
  CopilotRuntime,
  copilotRuntimeNextJSAppRouterEndpoint,
  OpenAIAdapter,
} from "@copilotkit/runtime";
import {
  createTask,
  toggleTask,
  deleteTask,
  clearCompletedTasks,
  completeAlltasks,
  getAllTasks,
} from "@/app/actions/taskActions";

const copilotActions = [
  {
    name: "createTask",
    description: "Create a new task with the given title",
    parameters: [{ name: "title", type: "string", description: "Task title" }],
    handler: async ({ title }: { title: string }) => {
      const formData = new FormData();
      formData.set("title", title);
      await createTask(formData);
      return { message: `Created task '${title}'` };
    },
  }, 
  {
    name: "toggleTask",
    description: "Toggle a task’s completion state",
    parameters: [
      { name: "id", type: "number", description: "Task ID" },
      { name: "completed", type: "boolean", description: "Whether task is completed" },
    ],
    handler: async ({ id, completed }: { id: number; completed: boolean }) => {
      await toggleTask(id, completed);
      return { message: `Task ${id} marked as ${completed ? "done" : "pending"}` };
    },
  },
  {
    name: "deleteTask",
    description: "Delete a task by ID",
    parameters: [{ name: "id", type: "number", description: "Task ID" }],
    handler: async ({ id }: { id: number }) => {
      const formData = new FormData();
      formData.set("id", id.toString());
      await deleteTask(formData);
      return { message: `Deleted task ${id}` };
    },
  },
  {
    name: "clearCompletedTasks",
    description: "Remove all completed tasks",
    parameters: [],
    handler: async () => {
      await clearCompletedTasks();
      return { message: "Cleared completed tasks" };
    },
  },
  {
    name: "completeIncompleteTasks",
    description: "Mark all incomplete tasks as completed",
    parameters: [],
    handler: async () => {
      await completeAlltasks();
      return { message: "All incomplete tasks marked as completed" };
    },
  },
  {
  name: "getAllTasks",
  description: "Retrieve all tasks from the database",
  parameters: [],
  handler: async () => {
    const tasks = await getAllTasks();
    return { tasks };
  },
}
];

// Initialize Copilot runtime and adapter 
const runtime = new CopilotRuntime({ actions: copilotActions as any });
const adapter = new OpenAIAdapter({ model: "gpt-4o-mini" });

export async function POST(req: NextRequest) {
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime,
    serviceAdapter: adapter,
    endpoint: "/api/copilot",
  });
  return handleRequest(req);
}

export async function GET() {
  return Response.json({
    message: "CopilotKit API ready",
    availableActions: copilotActions.map(a => a.name),
  });
}
