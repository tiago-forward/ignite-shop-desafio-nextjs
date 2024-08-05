"use client"

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { useSearchParams } from "next/navigation";
import Head from "next/head";

interface LineItem {
    id: string
    description: string
    price: {
        product: {
            name: string
            images: string[]
        }
    }
}

interface CheckoutSession {
    id: string
    customer_details: {
        name: string
    }
    line_items: {
        data: LineItem[]
    }
}

export default function SuccessPage() {
    const searchParams = useSearchParams()
    const sessionId = searchParams.get("session_id")
    const [sessionData, setSessionData] = useState<CheckoutSession | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!sessionId) {
            window.location.href = '/';
            return;
        }

        async function fetchSessionData() {

            try {
                const response = await fetch(`/api/checkout/${sessionId}`)
                const data = await response.json()

                if (response.redirected) {
                    window.location.href = data.url;
                    return;
                }

                if (response.ok) {
                    setSessionData(data)
                } else {
                    throw new Error(data.error || 'Não consegui buscar dados da sessão')
                }
            } catch (err) {
                console.error("", err)
                setError(err.message || "Ocorreu um erro ao buscar dados da sessão.")
            } finally {
                setIsLoading(false)
            }
        }

        fetchSessionData()
    }, [sessionId])

    if (error) {
        return <div>Erro: {error}</div>;
    }

    const customerName = sessionData?.customer_details.name
    const productName = sessionData?.line_items.data[0].price.product.name
    const productImage = sessionData?.line_items.data[0].price.product.images[0]

    return (
        <>
            <Head>
                <title>Compra efetuada | Ignite Shop</title>

                <meta name="robots" content="noindex" />
            </Head>

            {isLoading
                ? (
                    <div className="flex max-w-[1180px] m-auto"><span className="text-4xl">Carregando...</span></div>
                )
                : (
                    <main className="flex flex-col items-center justify-center m-auto h-[656px]">
                        <h1 className="text-3xl text-gray-100">Compra efetuada!</h1>
                        <div className="background-product w-full max-w-[130px] h-[145px] rounded-lg p-1 flex items-center justify-center mt-16">
                            {productImage && productName && (
                                <Image src={productImage} alt={productName} width={130} height={145} className="object-cover" />
                            )}
                        </div>
                        <p className="text-2xl text-gray-300 m-w-[560px] text-center mt-8">Uhuul <strong className="font-bold">{customerName}</strong>, sua <strong className="font-bold">{productName}</strong> já está a caminho da sua casa.</p>
                        <Link href={"/"} className="mt-20 block text-xl text-green-500 font-bold hover:text-green-300">
                            Voltar ao catálogo
                        </Link>
                    </main>
                )
            }
        </>
    )
}
