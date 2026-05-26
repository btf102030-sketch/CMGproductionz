import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request?.json?.();
    const name = body?.name ?? '';
    const email = body?.email ?? '';
    const message = body?.message ?? '';

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Contact submissions are acknowledged but not stored.
    // To receive emails, sign up at formspree.io, create a form,
    // and replace this with a fetch to your Formspree endpoint.
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Failed to send message.' },
      { status: 500 }
    );
  }
}
