export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request?.json?.();
    const name = body?.name ?? '';
    const email = body?.email ?? '';
    const phone = body?.phone ?? '';
    const subject = body?.subject ?? '';
    const message = body?.message ?? '';
    const eventType = body?.eventType ?? 'GENERAL';

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const submission = await prisma.contactSubmission.create({
      data: {
        name,
        email,
        phone,
        subject,
        message,
        eventType,
      },
    });

    return NextResponse.json({ success: true, id: submission?.id ?? '' });
  } catch (error: any) {
    console.error('Error saving contact:', error);
    return NextResponse.json(
      { error: 'Failed to save message.' },
      { status: 500 }
    );
  }
}
