import { NextResponse } from 'next/server';
import { readAuthors, writeAuthors } from '@/lib/authorsStorage';

// PUT handler moved to main route file due to dynamic routing issues with UUIDs

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: 'Author id required' }, { status: 400 });
  }

  try {
    const authors = await readAuthors();
    const authorIndex = authors.findIndex(a => a.id === id);
    if (authorIndex === -1) {
      return NextResponse.json({ error: 'Author not found' }, { status: 404 });
    }

    authors.splice(authorIndex, 1);
    await writeAuthors(authors);

    return NextResponse.json({ message: 'Author deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
