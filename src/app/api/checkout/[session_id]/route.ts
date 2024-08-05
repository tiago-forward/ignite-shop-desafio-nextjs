import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { session_id: string } }) {
    if (!params.session_id) {
        return NextResponse.json({
            redirect: true,
            url: '/',
        }, { status: 302 })
    }

    try {
        const sessionId = String(params.session_id)
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ['line_items', 'line_items.data.price.product', 'customer'],
        });

        return NextResponse.json(session, { status: 200 });
    } catch (error) {
        console.error('Erro ao buscar dados da sessão de checkout:', error)
        return NextResponse.json({
            error: 'Falha ao buscar dados da sessão de checkout',
        }, { status: 500 })
    }
}
