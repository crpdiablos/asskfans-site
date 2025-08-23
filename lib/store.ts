export type PriceMap = Record<string, number>;
export const CREDIT_PRICE_MAP: PriceMap = { 'price_100CREDITS':100, 'price_300CREDITS':300, 'price_1200CREDITS':1200 };
export const MERCH_PRODUCTS = [
  { sku: 'bag_of_dicks', label: 'Bag of Dicks (Novelty)', priceId: 'price_BAGDIX', note: 'Gag gift. Ships discreet.' },
  { sku: 'tee_assking', label: 'Ass King Tee', priceId: 'price_TEEKING', note: 'Premium cotton. Royal fit.' },
  { sku: 'hat_crown', label: 'Crown Cap', priceId: 'price_HATCROWN', note: 'Snapback. Bow before brim.' },
];
export function getCreditPacks(){ return [
  { priceId: 'price_100CREDITS', label: '100 credits', desc: 'Quick taste' },
  { priceId: 'price_300CREDITS', label: '300 credits', desc: 'Session ready' },
  { priceId: 'price_1200CREDITS', label: '1200 credits', desc: 'Marathon' },
];}
