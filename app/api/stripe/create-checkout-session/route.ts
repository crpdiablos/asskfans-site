import { NextResponse } from 'next/server';
export async function POST(req: Request){
  const body = await req.json().catch(()=>({}));
  // Stub response; replace with real Stripe session creation
  return NextResponse.json({ url: '/home', echo: body });
}
