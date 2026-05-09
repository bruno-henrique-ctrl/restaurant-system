"use client"

import { useEffect, useState } from "react"
import type { Order } from "@/types/Order"

type OrderProps = {
    orderName: string
}

export default function Orders({ orderName }: OrderProps) {
    const [orders, setOrders] = useState<Order[]>([])

    async function loadOrders() {
        const response = await fetch("/api/orders")
        const data = await response.json()
        setOrders(data.filter((o: Order) => o.status === orderName))
    }

    async function completeOrder(id: number) {
        await fetch(`/api/orders/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "READY" }),
        })
        loadOrders()
    }

    async function deleteOrder(id: number) {
        await fetch(`/api/orders/${id}`, { method: "DELETE" })
        loadOrders()
    }

    async function deliverOrder(id: number) {
        await fetch(`/api/orders/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "DELIVERED" }),
        })
        loadOrders()
    }

    useEffect(() => {
        async function load() {
            const response = await fetch("/api/orders")
            const data = await response.json()
            setOrders(data.filter((o: Order) => o.status === orderName))
        }

        load()
        const interval = setInterval(load, 3000)
        return () => clearInterval(interval)
    }, [orderName])

    if (orders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 sm:py-24 text-center">
                <div className="mb-4 text-4xl sm:text-5xl text-stone-800">◎</div>
                <p className="text-xs sm:text-sm uppercase tracking-widest text-stone-600">
                    Nenhum pedido
                </p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {orders.map((order) => (
                <div
                    key={order.id}
                    className="border border-stone-800 bg-stone-900 p-4 sm:p-6 transition-colors duration-200 hover:border-stone-700"
                >
                    {/* Mesa + ID */}
                    <div className="mb-4 sm:mb-5 flex items-start justify-between">
                        <div>
                            <p className="text-[10px] sm:text-xs uppercase tracking-widest text-stone-500">
                                Mesa
                            </p>
                            <p
                                className="text-3xl sm:text-4xl font-normal text-stone-100"
                                style={{ letterSpacing: "-0.02em" }}
                            >
                                {String(order.table).padStart(2, "0")}
                            </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <span className="border border-stone-700 px-2 py-1 text-[10px] sm:text-xs uppercase tracking-widest text-stone-600">
                                #{order.id}
                            </span>
                            {orderName === "READY" && (
                                <span className="border border-emerald-800 bg-emerald-950/50 px-2 py-1 text-[10px] sm:text-xs uppercase tracking-widest text-emerald-500">
                                    Pronto
                                </span>
                            )}
                            {orderName === "DELIVERED" && (
                                <span className="border border-stone-700 bg-stone-800 px-2 py-1 text-[10px] sm:text-xs uppercase tracking-widest text-stone-400">
                                    Entregue
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="mb-4 sm:mb-5 h-px bg-stone-800" />

                    {/* Cliente */}
                    <div className="mb-3 sm:mb-4">
                        <p className="mb-0.5 text-[10px] sm:text-xs uppercase tracking-widest text-stone-500">
                            Cliente
                        </p>
                        <p className="text-sm sm:text-base text-stone-300 italic">{order.customer}</p>
                    </div>

                    {/* Itens */}
                    <div className="mb-5 sm:mb-6">
                        <p className="mb-2 text-[10px] sm:text-xs uppercase tracking-widest text-stone-500">
                            Pedido
                        </p>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {order.items.split(",").map((item, i) => (
                                <span
                                    key={i}
                                    className="border border-stone-700 px-2 sm:px-2.5 py-1 text-[10px] sm:text-xs text-stone-400"
                                >
                                    {item.trim()}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Ações */}
                    <div className="flex flex-col gap-2">
                        {orderName === "PENDING" && (
                            <>
                                <button
                                    onClick={() => completeOrder(order.id)}
                                    className="w-full border border-amber-600 bg-amber-600 py-2.5 text-[10px] sm:text-xs uppercase tracking-widest text-stone-950 transition-all duration-300 hover:bg-transparent hover:text-amber-500"
                                >
                                    Marcar como Pronto
                                </button>
                                <button
                                    onClick={() => deleteOrder(order.id)}
                                    className="w-full border border-stone-700 py-2.5 text-[10px] sm:text-xs uppercase tracking-widest text-stone-500 transition-all duration-300 hover:border-red-800 hover:text-red-500"
                                >
                                    Cancelar Pedido
                                </button>
                            </>
                        )}

                        {orderName === "READY" && (
                            <button
                                onClick={() => deliverOrder(order.id)}
                                className="w-full border border-stone-400 bg-transparent py-2.5 text-[10px] sm:text-xs uppercase tracking-widest text-stone-300 transition-all duration-300 hover:border-stone-100 hover:text-stone-100"
                            >
                                Confirmar Entrega
                            </button>
                        )}

                        {orderName === "DELIVERED" && (
                            <p className="text-center text-[10px] sm:text-xs uppercase tracking-widest text-stone-700">
                                Pedido finalizado
                            </p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}