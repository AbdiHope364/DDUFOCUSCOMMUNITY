import { NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET() {
  const result = store.getTodayWord();

  const response = NextResponse.json(result.word, {
    status: 200,
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      'X-Daily-Word-Fallback': result.isFallback ? 'true' : 'false',
    },
  });

  return response;
}

