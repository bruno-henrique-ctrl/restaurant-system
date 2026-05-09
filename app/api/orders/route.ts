import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
    const orders = await prisma.order.findMany({
        orderBy: {
            createdAt: "asc",
        },
    })

    return NextResponse.json(orders)
}

export async function POST(req: Request) {
    const body = await req.json()

    const order = await prisma.order.create({
        data: {
            table: body.table,
            customer: body.customer,
            items: body.items.join(", "),
        },
    })

    return NextResponse.json(order)
}