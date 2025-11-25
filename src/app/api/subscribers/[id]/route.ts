import { NextRequest, NextResponse } from 'next/server';
import { readSubscribers, writeSubscribers } from '@/lib/subscribersStorage';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!['approved', 'rejected'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const subscribers = await readSubscribers();
    const subscriberIndex = subscribers.findIndex(sub => sub.id === id);

    if (subscriberIndex === -1) {
      return NextResponse.json({ error: 'Subscriber not found' }, { status: 404 });
    }

    subscribers[subscriberIndex].status = status;
    if (status === 'approved') {
      subscribers[subscriberIndex].approvedAt = new Date().toISOString();
    }

    await writeSubscribers(subscribers);

    return NextResponse.json({
      message: `Subscriber ${status} successfully`,
      subscriber: subscribers[subscriberIndex]
    });
  } catch (error) {
    console.error('Error updating subscriber:', error);
    return NextResponse.json({ error: 'Failed to update subscriber' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const subscribers = await readSubscribers();
    const filteredSubscribers = subscribers.filter(sub => sub.id !== id);

    if (filteredSubscribers.length === subscribers.length) {
      return NextResponse.json({ error: 'Subscriber not found' }, { status: 404 });
    }

    await writeSubscribers(filteredSubscribers);

    return NextResponse.json({ message: 'Subscriber deleted successfully' });
  } catch (error) {
    console.error('Error deleting subscriber:', error);
    return NextResponse.json({ error: 'Failed to delete subscriber' }, { status: 500 });
  }
}