import { NextResponse } from 'next/server';
import { merchItems } from '@/lib/data/merch';

export async function GET() {
  const inStock = merchItems.filter((item) => item.inStock);
  return NextResponse.json({ items: inStock });
}
