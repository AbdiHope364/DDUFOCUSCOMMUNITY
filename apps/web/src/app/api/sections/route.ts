import { NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET() {
  return NextResponse.json(store.sections, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.name || !body.slug || !body.description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    store.addSection(body);
    return NextResponse.json({ success: true, message: 'Section created successfully' }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

