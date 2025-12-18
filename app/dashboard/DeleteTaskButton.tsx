"use client"

import { deleteTask } from "./actions"

export default function DeleteTaskButton({ taskId }: { taskId: string }) {
  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this task?")
    if (!confirmed) return

    await deleteTask(taskId)
  }

  return (
    <button
      onClick={handleDelete}
      className="text-red-500 text-sm hover:underline"
    >
      Delete
    </button>
  )
}
