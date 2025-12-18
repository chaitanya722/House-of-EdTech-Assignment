import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import DeleteTaskButton from "./DeleteTaskButton"
import ToggleStatusButton from "./ToggleStatusButton"

/* ---------------- SERVER ACTIONS ---------------- */

async function deleteTaskAction(formData: FormData) {
  "use server"

  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return

  const taskId = formData.get("taskId") as string
  if (!taskId) return

  await prisma.task.deleteMany({
    where: {
      id: taskId,
      user: {
        email: session.user.email,
      },
    },
  })
}


async function toggleStatusAction(formData: FormData) {
  "use server"

  const taskId = formData.get("taskId") as string
  const status = formData.get("status") as string
  if (!taskId || !status) return

  await prisma.task.update({
    where: { id: taskId },
    data: {
      status: status === "TODO" ? "DONE" : "TODO",
    },
  })
}

/* ---------------- PAGE ---------------- */

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    redirect("/login")
  }

  const tasks = await prisma.task.findMany({
    where: {
      user: {
        email: session.user.email,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Tasks</h1>

        <Link
          href="/tasks/new"
          className="px-4 py-2 bg-black text-white rounded"
        >
          + New Task
        </Link>
      </div>

      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks created yet.</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="p-4 border rounded-md flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold">{task.title}</h2>
                <p className="text-sm text-gray-600">
                  {task.priority} • {task.status}
                </p>
              </div>

              <div className="flex items-center gap-3 text-sm">
                {/* Toggle Status */}
                <ToggleStatusButton
                  taskId={task.id}
                  status={task.status}
                  action={toggleStatusAction}
                />



                {/* Edit */}
                <Link
                  href={`/tasks/${task.id}/edit`}
                  className="text-gray-500 hover:underline"
                >
                  Edit
                </Link>

                {/* Delete */}

                <DeleteTaskButton taskId={task.id} />

              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
