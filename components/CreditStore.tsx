'use client';
import { useState } from 'react';
import { getAffiliateId } from '@/lib/aff';

export default function CreditStore() {
  const [email, setEmail] = useState('');

  async function buy(priceId: string) {
    const affiliateId = getAffiliateId();
    const res = await fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, priceId, affiliateId })
    });
    const j = await res.json();
    if (j.url) window.location.href = j.url;
    else alert(j.error ?? 'Checkout failed');
  }

  return (
    <div>
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email for receipt"
      />
      <button onClick={() => buy('price_100CREDITS')}>Buy 100 Credits</button>
    </div>
  );
}
