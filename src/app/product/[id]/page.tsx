"use client"

import { useEffect, useState } from "react"

import Image from "next/image";
import { useParams } from "next/navigation"

import { ProductProps } from "@/app/api/getProducts/route"
import axios from "axios";

import { Metadata } from "next";

// export const metadata: Metadata = {
//     title: 'Produtos | Ignite Shop'
// }

export default function Product() {
    const { id } = useParams()
    const [productData, setProductData] = useState<ProductProps | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleBuyProduct() {
        if (!productData?.defaultPriceId) {
            alert("O ID do preço do produto está faltando!")
            return;
        }

        try {
            setIsCreatingCheckoutSession(true)

            const response = await axios.post('/api/checkout', {
                priceId: productData?.defaultPriceId
            })

            const { checkoutUrl } = response.data

            if (checkoutUrl) {
                window.location.href = checkoutUrl
            } else {
                alert('Falha ao recuperar o URL de checkout.')
            }
        } catch (err) {
            setIsCreatingCheckoutSession(false)

            console.error('Erro ao redirecionar para checkout:', err)
            alert('Falha ao redirecionar ao checkout!')
        }
    }

    useEffect(() => {
        async function fetchProduct() {
            try {
                setIsLoading(true)
                const response = await fetch(`/api/product/${id}`)
                const data = await response.json()
                if (response.ok) {
                    setProductData(data)
                } else {
                    throw new Error(data.error || 'Failed to fetch product')
                }
            } catch (err) {
                console.error("Error fetching product:", err)
                setError(err.message || "An error occurred while fetching product details.")
            } finally {
                setIsLoading(false)
            }
        }

        fetchProduct()
    }, [id])


    if (error) {
        return <div>Erro: {error}</div>
    }

    return (
        <>
    

            {isLoading
                ? (
                    <div className="flex max-w-[1180px] m-auto"><span className="text-4xl">Carregando...</span></div>
                )
                : (
                    <main className="grid grid-cols-2 items-stretch gap-16 max-w-[1180px] m-auto">
                        <div className="w-full max-w-[576px] background-product rounded-lg p-1 flex items-center justify-center h-[656px]">
                            {productData?.imageUrl && (
                                <Image src={productData.imageUrl} alt={productData.name} width={576} height={656} className="object-cover" />
                            )}
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-[2rem] text-gray-300">{productData?.name}</h1>
                            <span className="mt-4 block text-[2rem] text-green-300">{productData?.price}</span>
                            <p className="mt-10 text-xl leading-[1.6] text-gray-300">{productData?.description}</p>
                            <button disabled={isCreatingCheckoutSession} onClick={handleBuyProduct} className="mt-auto bg-green-500 text-white border-0 rounded-lg cursor-pointer p-5 font-bold text-xl hover:bg-green-300 disabled:opacity-5 disabled:cursor-not-allowed">
                                Comprar agora
                            </button>
                        </div>
                    </main>
                )
            }
        </>
    )
}
