import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { createServiceClient } from "@/utils/supabase/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export async function POST(req){

    const body = await req.text();
    const signature = headers().get('stripe-signature');

    let event = Stripe.Event;

    const supabase = createServiceClient()

    try{
        event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error(`Webhook signature verification failed. ${err.message}`);
        return NextResponse.json({error: err.message}, {status: 400});
    }
    const session = event.data.object;
    if(event.type === 'checkout.session.completed'){
        const customer = session?.customer_details
        console.log(customer)
        console.log(session)
        console.log(customer)
        const {error} = await supabase
            .from('accounts')
            .update({membership: "Member"})
            .eq('id', session?.client_reference_id)
        console.log(error)
    }

    return new NextResponse("ok", {status: 200})
}