import { NextResponse } from 'next/server';
import { galleryImages } from '@/lib/data/gallery';

export async function GET() {
  return NextResponse.json({ images: galleryImages });
}
