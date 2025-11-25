import { NextRequest, NextResponse } from 'next/server';
import { readSubscribers, writeSubscribers, Subscriber } from '@/lib/subscribersStorage';

export async function GET() {
  try {
    const subscribers = await readSubscribers();
    return NextResponse.json({ subscribers });
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name, cardNumber, expiryDate, cvv } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const subscribers = await readSubscribers();

    // Check if email already exists
    if (subscribers.some(sub => sub.email === email)) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
    }

    const newSubscriber: Subscriber = {
      id: Date.now().toString(),
      email,
      password, // In real app, hash this
      name,
      status: 'pending',
      paymentInfo: cardNumber ? {
        cardNumber: cardNumber.replace(/\d(?=\d{4})/g, '*'), // Mask card number
        expiryDate,
        cvv: '***'
      } : undefined,
      createdAt: new Date().toISOString(),
    };

    subscribers.push(newSubscriber);
    await writeSubscribers(subscribers);

    return NextResponse.json({ message: 'Subscription request submitted successfully', subscriber: newSubscriber }, { status: 201 });
  } catch (error) {
    console.error('Error creating subscriber:', error);
    return NextResponse.json({ error: 'Failed to create subscriber' }, { status: 500 });
  }
}