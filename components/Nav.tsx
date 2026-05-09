"use client"

import { useNav } from "@/context/NavContext"

const links = [
    { id: "novo-pedido", label: "Novo Pedido" },
    { id: "cozinha", label: "Cozinha" },
    { id: "garcom", label: "Garçom" },
    { id: "entregues", label: "Entregues" },
]

export default function Nav() {
    const { selection, setSelection } = useNav()

    return (
        <>
            <nav className="mb-8 sm:mb-10 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {links.map(({ id, label }) => {
                    const active = selection === id
                    return (
                        <button
                            key={id}
                            type="button"
                            onClick={() => setSelection(id)}
                            className={`border py-2.5 px-3 sm:px-5 text-xs sm:text-sm uppercase tracking-wider sm:tracking-widest transition-all duration-300 ${active
                                    ? "border-amber-600 bg-amber-600 text-stone-950"
                                    : "border-stone-700 bg-transparent text-stone-400 hover:border-stone-400 hover:text-stone-100"
                                }`}
                        >
                            {label}
                        </button>
                    )
                })}
            </nav>

            <div className="mb-8 sm:mb-10 flex items-center gap-4">
                <div className="h-px flex-1 bg-stone-800" />
                <div className="h-1 w-1 rounded-full bg-amber-600" />
                <div className="h-px flex-1 bg-stone-800" />
            </div>
        </>
    )
}