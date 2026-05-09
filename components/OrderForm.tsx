"use client"

import { useState } from "react"

const menuItems = [
    "Hambúrguer",
    "Pizza",
    "Batata Frita",
    "Refrigerante",
    "Suco",
    "Sobremesa",
]

export default function OrderForm() {
    const [table, setTable] = useState("")
    const [customer, setCustomer] = useState("")
    const [selectedItems, setSelectedItems] = useState<string[]>([])
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({})
    const [loading, setLoading] = useState(false)

    function toggleItem(item: string) {
        setSelectedItems((prev) =>
            prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
        )
        setQuantities((prev) => ({ ...prev, [item]: prev[item] ?? 1 }))
    }

    function setQuantity(item: string, value: number) {
        setQuantities((prev) => ({ ...prev, [item]: Math.max(1, value) }))
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        if (!table || !customer || selectedItems.length === 0) {
            alert("Preencha todos os campos")
            return
        }

        setLoading(true)

        const items = selectedItems.map((item) => `${item} x${quantities[item] ?? 1}`)

        await fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ table: Number(table), customer, items }),
        })

        setTable("")
        setCustomer("")
        setSelectedItems([])
        setQuantities({})
        setLoading(false)
        alert("Pedido cadastrado!")
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            {/* Mesa + Cliente */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-2">
                    <label className="block text-[10px] sm:text-xs uppercase tracking-widest text-stone-400">
                        Mesa
                    </label>
                    <input
                        type="number"
                        value={table}
                        min={1}
                        max={99}
                        onChange={(e) => setTable(e.target.value)}
                        placeholder="01"
                        className="w-full border-0 border-b border-stone-700 bg-transparent py-2 text-xl sm:text-2xl text-stone-100 placeholder-stone-700 outline-none transition-colors focus:border-amber-600"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-[10px] sm:text-xs uppercase tracking-widest text-stone-400">
                        Cliente
                    </label>
                    <input
                        type="text"
                        value={customer}
                        onChange={(e) =>
                            setCustomer(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))
                        }
                        placeholder="Nome"
                        className="w-full border-0 border-b border-stone-700 bg-transparent py-2 text-base sm:text-lg text-stone-100 placeholder-stone-700 outline-none transition-colors focus:border-amber-600"
                    />
                </div>
            </div>

            {/* Itens */}
            <div className="space-y-3">
                <div className="flex items-center gap-2 sm:gap-3">
                    <p className="text-[10px] sm:text-xs uppercase tracking-widest text-stone-400 whitespace-nowrap">
                        Itens do Pedido
                    </p>
                    <div className="h-px flex-1 bg-stone-800" />
                    {selectedItems.length > 0 && (
                        <span className="text-[10px] sm:text-xs text-amber-600 whitespace-nowrap">
                            {selectedItems.length} selecionado{selectedItems.length > 1 ? "s" : ""}
                        </span>
                    )}
                </div>

                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-2">
                    {menuItems.map((item) => {
                        const selected = selectedItems.includes(item)
                        return (
                            <div key={item} className="flex flex-col">
                                <button
                                    type="button"
                                    onClick={() => toggleItem(item)}
                                    className={`flex w-full items-center gap-2 sm:gap-3 border px-3 sm:px-4 py-3 text-left text-xs sm:text-sm transition-all duration-200 ${selected
                                        ? "border-amber-600 bg-amber-600/10 text-amber-400"
                                        : "border-stone-800 bg-stone-950/50 text-stone-400 hover:border-stone-600 hover:text-stone-200"
                                        }`}
                                >
                                    <span
                                        className={`flex h-4 w-4 shrink-0 items-center justify-center border transition-all duration-200 ${selected ? "border-amber-600 bg-amber-600" : "border-stone-700"
                                            }`}
                                    >
                                        {selected && (
                                            <svg className="h-2.5 w-2.5 text-stone-950" fill="none" viewBox="0 0 10 10">
                                                <path
                                                    d="M1.5 5l2.5 2.5 4.5-4.5"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        )}
                                    </span>
                                    {item}
                                </button>

                                {selected && (
                                    <div className="flex items-center gap-2 border border-t-0 border-amber-600/30 bg-amber-600/5 px-3 sm:px-4 py-2">
                                        <span className="text-[10px] sm:text-xs uppercase tracking-widest text-stone-500">
                                            Qtd
                                        </span>
                                        <div className="flex items-center gap-1">
                                            <button
                                                type="button"
                                                onClick={() => setQuantity(item, (quantities[item] ?? 1) - 1)}
                                                className="flex h-5 w-5 items-center justify-center border border-stone-700 text-stone-400 transition-colors hover:border-amber-600 hover:text-amber-500"
                                            >
                                                −
                                            </button>
                                            <span className="w-6 text-center text-sm text-stone-300">
                                                {quantities[item] ?? 1}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => setQuantity(item, (quantities[item] ?? 1) + 1)}
                                                className="flex h-5 w-5 items-center justify-center border border-stone-700 text-stone-400 transition-colors hover:border-amber-600 hover:text-amber-500"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Resumo */}
            {selectedItems.length > 0 && (
                <div className="border border-stone-800 bg-stone-950/60 px-3 sm:px-4 py-3">
                    <p className="mb-2 text-[10px] sm:text-xs uppercase tracking-widest text-stone-600">
                        Resumo
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {selectedItems.map((item) => (
                            <span
                                key={item}
                                className="border border-stone-700 px-2 sm:px-2.5 py-1 text-[10px] sm:text-xs italic text-stone-400"
                            >
                                {item} × {quantities[item] ?? 1}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Submit */}
            <button
                type="submit"
                disabled={loading}
                className={`w-full border py-3 sm:py-3.5 text-[10px] sm:text-xs uppercase tracking-widest transition-all duration-300 ${loading
                    ? "cursor-not-allowed border-stone-700 text-stone-600"
                    : "border-amber-600 bg-amber-600 text-stone-950 hover:bg-transparent hover:text-amber-500"
                    }`}
            >
                {loading ? "Registrando pedido..." : "Confirmar Pedido"}
            </button>
        </form>
    )
}