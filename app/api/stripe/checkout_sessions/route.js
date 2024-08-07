const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import { NextRequest } from 'next/server';
 async function handler(req) {
  switch (req.method) {
    case "POST":
      try {
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
          ui_mode: 'embedded',
          line_items: [
            {
              price: 'price_1PWUrgAHFnpEtkCSCHY9B6Eq',
              quantity: 1,
            },
          ],
          mode: 'payment',
          return_url:
            `${req.headers.get('origin')}/return?session_id={CHECKOUT_SESSION_ID}`,
          automatic_tax: {enabled: true},
        });
        return new Response('',{headers: {"clientSecret": session.client_secret}});
      } catch (err) {
        return new Response('', {status: 500})
      }
      break;
    case "GET":
      try {
        const url = new URL(req.url)
        const searchParams = new URLSearchParams(url.searchParams);
        const session_id = searchParams.get('session_id')
        const session = await stripe.checkout.sessions.retrieve(session_id);
        return new Response('',{ status: 200 , customer_email: session.customer_details.email})
      } catch (err) {
        return new Response(err, {status: 500})
      }
      break;
    default:
      return new Response('', {status: 405, headers: {'Allow': req.method}})
  }
}

export { handler as GET, handler as POST}