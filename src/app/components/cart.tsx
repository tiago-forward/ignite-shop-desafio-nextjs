"use client"

import * as Dialog from "@radix-ui/react-dialog";

import Image from "next/image";

import Handbag from '../../../public/handbag.svg'
import X from '../../../public/x.svg'
import { CartContext } from "@/context/CartContext";
import { useContext } from "react";

export default function Cart() {
    const { products, removeProductsFromCart } = useContext(CartContext);

    const totalItems = products.length



    const totalValue = products.reduce((acc, product) => {
        const priceNumber = parseFloat(product.price.replace(/[^0-9,-]+/g, "").replace(",", "."))
        return acc + priceNumber
    }, 0).toFixed(2)

    function handleRemoveProductsFromCart(uniqueKey: string) {
        removeProductsFromCart(uniqueKey)
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger className="bg-[#202024] rounded-md m-auto relative">
                <Image src={Handbag} alt="" className="text-slate-50 m-3" />
                <span className="absolute -top-3 -right-3 w-7 h-7 bg-green-500 rounded-full font-bold text-sm flex items-center justify-center border-collapse">{totalItems}</span>
            </Dialog.Trigger>

            <Dialog.Content className="z-10 absolute right-0 top-0 bg-[#202024] h-screen shadow-2xl drop-shadow-2xl shadow-black flex flex-col justify-start">
                <div className="flex items-center justify-between w-96">
                    <div></div>
                    <Dialog.Close>
                        <Image width={25} height={25} src={X} alt="" className="text-slate-50 m-3" />
                    </Dialog.Close>
                </div>

                <div className="flex flex-col justify-between p-12 h-full">
                    <div className="flex flex-col gap-5">
                        <Dialog.Title className="text-xl font-bold">Sacola de compras</Dialog.Title>

                        {products.length > 0
                            ? (
                                products.map((product) => (
                                    <div key={product.uniqueKey} className="flex gap-5">
                                        <div className="background-product rounded-lg">
                                            <Image width={100} height={90} src={product.imageUrl} alt={product.name} className="text-slate-50 m-3" />
                                        </div>
                                        <div className="flex flex-col items-start gap-2">
                                            <h2 className="text-lg">{product.name}</h2>
                                            <span className="font-bold text-lg">{product.price}</span>
                                            <button onClick={() => handleRemoveProductsFromCart(product.uniqueKey)} className="text-green-500 font-bold hover:text-green-300">Remover</button>
                                        </div>
                                    </div>
                                ))
                            )
                            : (
                                <p className="text-gray-300">Seu carrinho está vazio</p>
                            )
                        }
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <p>Quantidades</p>
                            {totalItems > 1
                                ? (
                                    <span>{totalItems} itens</span>
                                )
                                : (
                                    <span>{totalItems} item</span>
                                )
                            }
                        </div>
                        <div className="flex items-center justify-between font-bold">
                            <p>Valor total</p>
                            <span>R$ {totalValue}</span>
                        </div>

                        <button className="mt-12 bg-green-500 text-white border-0 rounded-lg cursor-pointer p-5 font-bold text-base hover:bg-green-300 disabled:opacity-5 disabled:cursor-not-allowed">Finalizar compra</button>
                    </div>
                </div>
            </Dialog.Content>
        </Dialog.Root>
    )
}
