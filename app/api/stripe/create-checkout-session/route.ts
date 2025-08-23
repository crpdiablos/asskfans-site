import { NextResponse } from 'next/server';

// Hit your Replit backend directly
const BACKEND_URL = "https://91efbb93-c198-4744-8d66-bb7d8dc082db-00-2sbw60xde401x.riker.replit.dev/api/checkout";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    const resp = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-assk-origin': 'frontend' },
      body: JSON.stringify(body),
    });

    const data = await resp.json().catch(() => ({ error: 'Invalid response from backend' }));

    if (!resp.ok) {
      return NextResponse.json({ error: data.error || 'Backend error' }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Unexpected error' }, { status: 500 });
  }
}
