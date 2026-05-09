"use client"

import { useNav } from "@/context/NavContext"

const footerText: Record<string, string> = {
    "novo-pedido": "Mesa • Pedido • Entrega",
    "cozinha": "Cozinha • Em Preparo • Pronto",
    "garcom": "Pronto • Em Entrega • Entregue",
    "entregues": "Pedido • Entregue • Finalizado",
}

export default function Footer() {
    const { selection } = useNav()

    return (
        <footer className="mt-8 sm:mt-10 md:mt-12 px-4 sm:px-0 text-center text-[10px] sm:text-xs tracking-widestuppercase">
            {footerText[selection] ?? "Mesa • Pedido • Entrega"}
        </footer>
    )
}