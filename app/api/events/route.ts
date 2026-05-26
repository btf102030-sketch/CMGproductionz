import { NextResponse } from 'next/server';
import { events } from '@/lib/data/events';

export async function GET() {
  const upcoming = events.filter((e) => e.status === 'UPCOMING');
  return NextResponse.json({ events: upcoming });
}
