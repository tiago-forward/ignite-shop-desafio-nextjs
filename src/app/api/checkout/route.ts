import { stripe } from '@/lib/stripe';

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { priceId } = await req.json();

        if (req.method !== 'POST') {
            return NextResponse.json({ error: 'Método não permitido' }, { status: 405 })
        }

        if (!priceId) {
            return NextResponse.json({ error: 'O ID do preço é obrigatório' }, { status: 400 });
        }

        const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
        const cancelUrl = `${process.env.NEXT_URL}/`

        const checkoutSession = await stripe.checkout.sessions.create({
            success_url: successUrl,
            cancel_url: cancelUrl,
            mode: 'payment',
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                }
            ]
        })

        return NextResponse.json({
            checkoutUrl: checkoutSession.url,
        }, { status: 201 })
    } catch (error) {
        console.error('Erro ao criar sessão de checkout:', error)
        return NextResponse.json({
            error: 'Falha ao criar sessão de checkout',
        }, { status: 500 })
    }
}
