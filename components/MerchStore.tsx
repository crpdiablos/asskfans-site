"use client";
import { getAffiliateId } from "@/lib/aff";
import { useState } from "react";

type Props = { email?: string }; // 👈 declare prop type

export default function MerchStore({ email: emailProp }: Props) {
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
      <h3 style={{ marginTop: 0 }}>Merch</h3>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email for receipt"
        style={{ padding: 8, width: "100%", marginBottom: 8 }}
      />
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={() => buy("price_TEE_BLACK_L")}>“Bags of Dicks” Tee</button>
        <button onClick={() => buy("price_HAT_BLACK_OS")}>Crown Hat</button>
      </div>
    </div>
  );
}
