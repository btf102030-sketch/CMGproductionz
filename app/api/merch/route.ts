export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const items = await prisma.merchItem.findMany({
      orderBy: { createdAt: 'desc' },
      where: { inStock: true },
    });
    return NextResponse.json({ items: items ?? [] });
  } catch (error: any) {
    console.error('Error fetching merch:', error);
    return NextResponse.json({ items: [] });
  }
}
