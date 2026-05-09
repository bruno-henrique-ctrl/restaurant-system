'use client'

import { useNav } from "@/context/NavContext"
import OrderForm from "@/components/OrderForm"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Orders from "@/components/Orders"

type HeaderInfo = {
  title: string
  subtitle: string
}

export default function Home() {
  const { selection } = useNav()
  const header: Record<string, HeaderInfo> = {
    "novo-pedido": {
      title: "Novo Pedido",
      subtitle: "Acompanhe e prepare os pedidos em aberto",
    },
    "cozinha": {
      title: "Pedidos Pendentes",
      subtitle: "Acompanhe e prepare os pedidos em aberto",
    },
    "garcom": {
      title: "Pedidos Prontos",
      subtitle: "Acompanhe e prepare os pedidos prontos",
    },
    "entregues": {
      title: "Pedidos Entregues",
      subtitle: "Acompanhe e prepare os pedidos entregues",
    },
  }

  return (
    <main className="min-h-screen bg-stone-950 px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10">
      <div className="mx-auto w-full max-w-3xl">
        <Header
          title={header[selection].title}
          subtitle={header[selection].subtitle}
          pagetitle={header[selection].title}
        />

        <Nav />

        {selection === "novo-pedido" && <OrderForm />}
        {selection === "cozinha" && <Orders orderName="PENDING" />}
        {selection === "garcom" && <Orders orderName="READY" />}
        {selection === "entregues" && <Orders orderName="DELIVERED" />}

        <Footer />
      </div>
    </main>
  )
}