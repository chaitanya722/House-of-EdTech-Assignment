"use client"

import { useState } from "react"

export default function NewTaskPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("MEDIUM")
  const [loading, setLoading] = useState(false)

  const generateWithAI = async () => {
    if (!title) {
      alert("Please enter a title first")
      return
    }

    setLoading(true)

    const res = await fetch("/api/ai/generate-task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    })

    const data = await res.json()

    setLoading(false)

    if (data.description) {
      setDescription(data.description)
      setPriority(data.priority || "MEDIUM")
    
      if (data.fallback) {
        alert("AI quota exceeded. Showing a default suggestion.")
      }
    }
    
  }

  return (
    <form
      action="/tasks/new"
      method="POST"
      className="max-w-md mx-auto p-6 space-y-4"
    >
      <h1 className="text-xl font-bold">Create Task</h1>

      <input
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        className="w-full border p-2 rounded"
        required
      />

      <button
        type="button"
        onClick={generateWithAI}
        className="text-sm text-blue-600 underline"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate with AI"}
      </button>

      <textarea
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task description"
        className="w-full border p-2 rounded"
      />

      <select
        name="priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="w-full border p-2 rounded"
      >
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
      </select>

      <button className="bg-black text-white px-4 py-2 rounded">
        Create Task
      </button>
    </form>
  )
}
