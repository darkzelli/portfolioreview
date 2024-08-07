"use client";
import React, { useCallback } from "react";
import { loadStripe  } from "@stripe/stripe-js";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Test() {
    const fetchClientSecret = useCallback(() => {
      return fetch("/api/stripe/checkout_sessions", {
        method: "POST",
      }).then((res) => {return res.headers.get('clientSecret')})
    }, []);
  
    const options = {fetchClientSecret};
  
    return (
      <div>
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={options}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    )
  }