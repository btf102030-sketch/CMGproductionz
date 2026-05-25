export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { date: 'asc' },
      where: { status: 'UPCOMING' },
    });
    return NextResponse.json({ events: events ?? [] });
  } catch (error: any) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ events: [] });
  }
}
