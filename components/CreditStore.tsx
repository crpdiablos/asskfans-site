"use client";
import { useState } from "react";
import { getAffiliateId } from "@/lib/aff";

type Props = { email?: string }; // 👈 declare prop type

export default function CreditStore({ email: emailProp }: Props) {
  const [email, setEmail] = useState(emailProp ?? "");

  async function buy(priceId: string) {
    const affiliateId = getAffiliateId();
    const res = await fetch("/api/stripe/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, priceId, affiliateId }),
    });
    const j = await res.json();
    if (j.url) window.location.href = j.url;
    else alert(j.error ?? "Checkout failed");
  }

  return (
    <div style={{ border: "1px solid #333", padding: 12, borderRadius: 12 }}>
      <h3 style={{ marginTop: 0 }}>Buy Credits</h3>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email for receipt"
        style={{ padding: 8, width: "100%", marginBottom: 8 }}
      />
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => buy("price_100CREDITS")}>Buy 100 Credits</button>
        <button onClick={() => buy("price_500CREDITS")}>Buy 500 Credits</button>
      </div>
    </div>
  );
}
