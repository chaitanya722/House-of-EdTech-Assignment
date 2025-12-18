import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const task = await prisma.task.findUnique({
    where: { id: params.id },
    include: { user: true },
  })

  if (!task || task.user.email !== session.user.email) {
    return new NextResponse("Forbidden", { status: 403 })
  }

  await prisma.task.delete({
    where: { id: params.id },
  })

  return NextResponse.json({ success: true })
}


export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
  ) {
    const session = await getServerSession(authOptions)
  
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
  
    const task = await prisma.task.findUnique({
      where: { id: params.id },
      include: { user: true },
    })
  
    if (!task || task.user.email !== session.user.email) {
      return new NextResponse("Forbidden", { status: 403 })
    }
  
    const updated = await prisma.task.update({
      where: { id: params.id },
      data: {
        status: task.status === "TODO" ? "DONE" : "TODO",
      },
    })
  
    return NextResponse.json(updated)
  }
  