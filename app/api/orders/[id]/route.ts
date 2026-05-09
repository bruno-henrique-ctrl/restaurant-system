import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    const body = await req.json()

    const order = await prisma.order.update({
        where: {
            id: Number(id),
        },
        data: {
            status: body.status,
        },
    })

    return NextResponse.json(order)
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params

    const order = await prisma.order.delete({
        where: {
            id: Number(id),
        },
    })

    return NextResponse.json(order)
}