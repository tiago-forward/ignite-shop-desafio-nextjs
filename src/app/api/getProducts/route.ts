import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

export interface ProductProps {
    id: string
    name: string
    imageUrl: string
    price: string
    description?: string
    defaultPriceId?: string
}

export async function GET() {
    try {
        const response = await stripe.products.list({
            expand: ['data.default_price']
        })

        const products: ProductProps[] = response.data.map(product => {
            const price = product.default_price as Stripe.Price
            const unitAmount = price.unit_amount;

            if (!unitAmount) {
                throw new Error(`O produto ${product.id} não possui uma quantidade unitária válida.`)
            }

            return {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                price: new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(unitAmount / 100),
            }
        })

        return NextResponse.json(products)
    } catch {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
