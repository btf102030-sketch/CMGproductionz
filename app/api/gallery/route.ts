export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const images = await prisma.galleryImage.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ images: images ?? [] });
  } catch (error: any) {
    console.error('Error fetching gallery:', error);
    return NextResponse.json({ images: [] });
  }
}
