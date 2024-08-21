import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { createServiceClient } from "@/utils/supabase/server";
import Stripe from "stripe";
import { Resend } from 'resend';
import Email from '@/components/Email'


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export async function POST(req){

    const body = await req.body
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
        const email = session?.customer_details?.email
        const {error} = await supabase
            .from('accounts')
            .update({membership: "Member"})
            .eq('id', session?.client_reference_id);
        const resend = new Resend(process.env.RESEND_KEY)
  
        try {
            const res = await resend.emails.send({
              from: 'Portfolio Review <team@portfolioreview.me>',
              to: email,
              subject: 'Membership',
              react: <Email/>
            })
            return Response.json({message: res}, {status: 200})
        } catch (error) {
            return Response.json({message: error}, {status: 400})
        }
    }

    return new NextResponse("ok", {status: 200})
}