import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function EditTaskPage({ params }: PageProps) {
  const { id } = await params   // ✅ IMPORTANT FIX

  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect("/login")

  const task = await prisma.task.findUnique({
    where: { id },
    include: { user: true },
  })

  if (!task || task.user.email !== session.user.email) {
    redirect("/dashboard")
  }

  async function updateTask(formData: FormData) {
    "use server"

    await prisma.task.update({
      where: { id },
      data: {
        title: formData.get("title") as string,
        priority: formData.get("priority") as any,
      },
    })

    redirect("/dashboard")
  }

  return (
    <form
      action={updateTask}
      className="max-w-md mx-auto p-6 space-y-4"
    >
      <h1 className="text-xl font-bold">Edit Task</h1>

      <input
        name="title"
        defaultValue={task.title}
        className="w-full border p-2 rounded"
        required
      />

      <select
        name="priority"
        defaultValue={task.priority}
        className="w-full border p-2 rounded"
      >
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
      </select>

      <button className="bg-black text-white px-4 py-2 rounded">
        Save
      </button>
    </form>
  )
}
