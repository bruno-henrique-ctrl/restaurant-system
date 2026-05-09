// context/NavContext.tsx
"use client"

import { createContext, useContext, useState } from "react"

type NavContextType = {
    selection: string
    setSelection: (v: string) => void
}

const NavContext = createContext<NavContextType | null>(null)

export function NavProvider({ children }: { children: React.ReactNode }) {
    const [selection, setSelection] = useState("novo-pedido")

    return (
        <NavContext.Provider value={{ selection, setSelection }}>
            {children}
        </NavContext.Provider>
    )
}

export function useNav() {
    const ctx = useContext(NavContext)
    if (!ctx) throw new Error("useNav deve ser usado dentro do NavProvider")
    return ctx
}