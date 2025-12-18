"use server"

import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export async function createTask(formData: FormData) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect("/login")

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const priority = formData.get("priority") as "LOW" | "MEDIUM" | "HIGH"

  if (!title) return

  await prisma.task.create({
    data: {
      title,
      description,
      priority,
      status: "TODO",
      user: {
        connect: {
          email: session.user.email,
        },
      },
    },
  })

  redirect("/dashboard")
}
