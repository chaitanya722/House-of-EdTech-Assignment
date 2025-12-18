"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function deleteTask(taskId: string) {
  if (!taskId) return

  await prisma.task.delete({
    where: { id: taskId },
  })

  revalidatePath("/dashboard") // 🔥 refresh UI
}
