'use client';
import { getAffiliateId } from '@/lib/aff';

export default function MerchStore() {
  // If you already capture email elsewhere, you can pass it down as a prop
  const email = ''; // or from props/context

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
      <button onClick={() => buy('price_TSHIRT_BLACK_L')}>Buy “Bags of Dicks” Tee</button>
    </div>
  );
}
