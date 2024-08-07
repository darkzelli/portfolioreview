import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export async function POST(req){

    const body = await req.text();
    const signature = headers().get('stripe-signature');

    let event = Stripe.Event;

    try{
        event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error(`Webhook signature verification failed. ${err.message}`);
        return NextResponse.json({error: err.message}, {status: 400});
    }
    const session = event.data.object;
    console.log('session', session)
    if(event.type === 'checkout.session.completed'){
        console.log("payemnt was successful")
    }

    return new NextResponse("ok", {status: 200})

    /*const data = event.data;
    const eventType = event.type

    try{
        switch(eventType){
            case 'checkout.session.completed': {
                const stripeSession = await stripe.checkout.sessions.retrieve(
                    data.object.id,
                    {
                        expand: ['line_items']
                    }
                )
                const customerId = stripeSession?.customer;
                const customer = await stripe.customers.retrieve(customerId);
                console.log(customer)


            }
        }
    }catch(err){
        console.error(`No Webhook handler resolved. ${err.message}`);
        return NextResponse.json({error: err.message}, {status: 400});
    }*/
}