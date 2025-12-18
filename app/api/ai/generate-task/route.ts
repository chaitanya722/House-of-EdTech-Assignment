import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function POST(req: Request) {
  try {
    const { title } = await req.json()

    if (!title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      )
    }

    const prompt = `
You are a task management assistant.
Based on the task title, generate:
1. A short, clear task description (2–3 lines)
2. Suggested priority: LOW, MEDIUM, or HIGH

Task title: "${title}"

Respond in JSON with keys:
description, priority
`

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4,
    })

    const text = completion.choices[0].message.content

    // Parse JSON safely
    const result = JSON.parse(text || "{}")

    return NextResponse.json(result)
  } catch (error: any) {
    console.error("AI Error:", error?.code)
  
    // Graceful fallback when quota is exceeded
    if (error?.code === "insufficient_quota") {
      return NextResponse.json({
        description:
          "This task requires focused attention. Break it down into smaller steps and prioritize accordingly.",
        priority: "MEDIUM",
        fallback: true,
      })
    }
  
    return NextResponse.json(
      { error: "AI generation failed" },
      { status: 500 }
    )
  }
  
}
