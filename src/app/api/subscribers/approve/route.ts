import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';
import { readSubscribers, writeSubscribers } from '@/lib/subscribersStorage';

export async function POST(request: NextRequest) {
  try {
    const { subscriberId } = await request.json();

    const subscribers = await readSubscribers();
    const subscriber = subscribers.find(sub => sub.id === subscriberId);

    if (!subscriber) {
      return NextResponse.json({ error: 'Subscriber not found' }, { status: 404 });
    }

    if (subscriber.status === 'approved') {
      return NextResponse.json({ error: 'Subscriber already approved' }, { status: 400 });
    }

    // Create Firebase user
    try {
      await adminAuth.createUser({
        email: subscriber.email,
        password: subscriber.password,
        displayName: subscriber.name,
      });
    } catch (error: any) {
      if (error.code === 'auth/email-already-exists') {
        // User already exists, continue
      } else {
        throw error;
      }
    }

    // Update subscriber status
    subscriber.status = 'approved';
    subscriber.approvedAt = new Date().toISOString();

    await writeSubscribers(subscribers);

    return NextResponse.json({
      message: 'Subscriber approved successfully',
      subscriber
    });
  } catch (error) {
    console.error('Error approving subscriber:', error);
    return NextResponse.json({ error: 'Failed to approve subscriber' }, { status: 500 });
  }
}