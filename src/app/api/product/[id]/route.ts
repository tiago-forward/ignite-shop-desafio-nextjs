import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

import { ProductProps } from "../../getProducts/route";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const product = await stripe.products.retrieve(params.id, {
            expand: ['default_price']
        });

        const price = product.default_price as Stripe.Price;
        if (!price.unit_amount) {
            throw new Error(`O produto ${product.id} não possui uma quantidade unitária válida.`);
        }

        const productData: ProductProps = {
            id: product.id,
            name: product.name,
            imageUrl: product.images[0],
            price: new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(price.unit_amount / 100),
            description: product.description || '',
            defaultPriceId: price.id,
        };

        return NextResponse.json(productData);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
