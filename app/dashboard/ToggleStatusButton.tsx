"use client"

export default function ToggleStatusButton({
  taskId,
  status,
  action,
}: {
  taskId: string
  status: string
  action: (formData: FormData) => Promise<void>
}) {
  return (
    <form
      action={async (formData) => {
        await action(formData)
        alert(
          status === "TODO"
            ? "Task marked as DONE ✅"
            : "Task marked as TODO 🔄"
        )
      }}
    >
      <input type="hidden" name="taskId" value={taskId} />
      <input type="hidden" name="status" value={status} />

      <button className="text-blue-500 hover:underline">
        {status === "TODO" ? "Mark Done" : "Mark Todo"}
      </button>
    </form>
  )
}
