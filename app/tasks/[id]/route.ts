import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"

/* ---------------- DELETE TASK ---------------- */

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const task = await prisma.task.findUnique({
    where: { id },
    include: { user: true },
  })

  if (!task || task.user.email !== session.user.email) {
    return new NextResponse("Forbidden", { status: 403 })
  }

  await prisma.task.delete({
    where: { id },
  })

  return NextResponse.json({ success: true })
}

/* ---------------- TOGGLE STATUS ---------------- */

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const task = await prisma.task.findUnique({
    where: { id },
    include: { user: true },
  })

  if (!task || task.user.email !== session.user.email) {
    return new NextResponse("Forbidden", { status: 403 })
  }

  const updated = await prisma.task.update({
    where: { id },
    data: {
      status: task.status === "TODO" ? "DONE" : "TODO",
    },
  })

  return NextResponse.json(updated)
}
