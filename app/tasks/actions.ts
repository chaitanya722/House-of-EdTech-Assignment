"use server"

import { prisma } from "@/lib/prisma"
import { taskSchema } from "@/validations/task"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export async function createTask(formData: FormData) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    throw new Error("Unauthorized")
  }

  const data = taskSchema.parse({
    title: formData.get("title"),
    description: formData.get("description"),
    priority: formData.get("priority"),
  })

  await prisma.task.create({
    data: {
      ...data,
      user: {
        connect: { email: session.user.email },
      },
    },
  })

  redirect("/dashboard")
}
