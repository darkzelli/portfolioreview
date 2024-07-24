import React, { useCallback } from "react";
import { loadStripe  } from "@stripe/stripe-js";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_NEXT_URL);

export default function Membership() {
    const fetchClientSecret = useCallback(() => {
      return fetch("/api/stripe/checkout_sessions", {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => data.clientSecret);
    }, []);
  
    const options = {fetchClientSecret};
  
    return (
      <div id="checkout">
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={options}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    )
  }