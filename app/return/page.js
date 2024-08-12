"use client"
import React, { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

export default function Return() {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');

    fetch(`/api/stripe/checkout_sessions?session_id=${sessionId}`, {
      method: "GET",
    }).then((res) => console.log(res))
  }, []);

  return (
    redirect('/dashboard')
  )

  
}