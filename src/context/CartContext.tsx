"use client"

import { ProductProps } from "@/app/api/getProducts/route"
import { createContext, ReactNode, useState } from "react"
import { v4 as uuidv4 } from 'uuid'

interface CartContextProps {
    children: ReactNode
}

interface Context {
    products: ProductProps[]
    // isAddingToCart: boolean;
    // windowSize: number;
    addToProductToCart: (product: ProductProps) => void
    // buyProducts: (allProductsInCart: ProductForCheckout[]) => void;
    removeProductsFromCart: (productId: string) => void
}

export const CartContext = createContext({} as Context)

export function CartContextProvider({ children }: CartContextProps) {
    const [products, setProducts] = useState<ProductProps[]>([])

    function addToProductToCart(product: ProductProps) {
        const productWithUniqueKey = {
            ...product,
            uniqueKey: uuidv4()
        }
        setProducts((state) => [...state, productWithUniqueKey])
    }

    function removeProductsFromCart(uniqueKey: string) {
        setProducts((currentProducts) => currentProducts.filter((product) => product.uniqueKey !== uniqueKey))
    }

    // async function buyProducts() { }

    return (
        <CartContext.Provider
            value={{
                products,
                addToProductToCart,
                removeProductsFromCart
            }}
        >
            {children}
        </CartContext.Provider>
    )
}
