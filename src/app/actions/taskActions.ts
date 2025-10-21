"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
  
export async function createTask(formData: FormData) {
  const title = (formData.get("title") as string) || "";2
  if (!title.trim()) return;
  await prisma.task.create({ data: { title: title.trim() } });
  revalidatePath("/");
}

export async function updateTask(formData: FormData) {
  const idRaw = formData.get("id");
  const title = (formData.get("title") as string) || "";
  if (!idRaw) return;
  const id = Number(idRaw);
  if (!title.trim()) return;
  await prisma.task.update({
    where: { id },
    data: { title: title.trim() },
  });
  revalidatePath("/");
}

export async function toggleTask(idRaw: FormData | number, completedRaw?: boolean) {
  let id: number;
  let completed: boolean | undefined;

  if (idRaw instanceof FormData) {
    id = Number(idRaw.get("id"));
    completed = (idRaw.get("completed") === "true");
  } else {
    id = Number(idRaw);
    completed = completedRaw;
  }

  if (Number.isNaN(id) || completed === undefined) return;

  await prisma.task.update({
    where: { id },
    data: { completed },
  });

  revalidatePath("/");
}

export async function deleteAllTasks(){
  await prisma.task.deleteMany({});
  revalidatePath("/");
}


export async function completeAlltasks(){
  await prisma.task.updateMany({
    where: {completed: false},
    data: {completed: true}
  
  });
  revalidatePath("/");
}

export async function uncompleteAlltasks(){
  await prisma.task.updateMany({
    where: {completed: true},
    data: {completed: false}
  });
  revalidatePath("/");
}

export async function clearCompletedTasks(){
  await prisma.task.deleteMany({
    where: {completed: true}
  });
  revalidatePath("/");
}
export async function markAllTasks(completed: boolean){
  await prisma.task.updateMany({
    data: {completed}
  });
  revalidatePath("/");
}

export async function deleteTask(formData: FormData) {
  const idRaw = formData.get("id");
  if (!idRaw) return;
  const id = Number(idRaw);
  if (Number.isNaN(id)) return;
  await prisma.task.delete({ where: { id } });
  revalidatePath("/");
}