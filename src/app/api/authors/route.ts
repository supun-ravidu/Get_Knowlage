
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { readAuthors, writeAuthors } from '@/lib/authorsStorage';

// GET /api/authors - returns list of authors
export async function GET() {
  const authors = await readAuthors();
  return NextResponse.json({ authors });
}

// PUT /api/authors - update an author (fallback for routing issues)
export async function PUT(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Author id required' }, { status: 400 });
    }

    const data = await request.json();
    const authors = await readAuthors();
    const authorIndex = authors.findIndex(a => a.id === id);

    if (authorIndex === -1) {
      return NextResponse.json({ error: 'Author not found' }, { status: 404 });
    }

    // Validate slug uniqueness if changed
    if (data.slug && data.slug !== authors[authorIndex].slug) {
      const exists = authors.some(a => a.slug === data.slug && a.id !== id);
      if (exists) {
        return NextResponse.json({ error: 'Author slug must be unique' }, { status: 400 });
      }
    }

    const updatedAuthor = {
      ...authors[authorIndex],
      ...data,
    };
    authors[authorIndex] = updatedAuthor;
    await writeAuthors(authors);

    return NextResponse.json({ author: updatedAuthor });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/authors - delete an author (fallback for routing issues)
export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Author id required' }, { status: 400 });
    }

    const authors = await readAuthors();
    const authorIndex = authors.findIndex(a => a.id === id);
    if (authorIndex === -1) {
      return NextResponse.json({ error: 'Author not found' }, { status: 404 });
    }

    authors.splice(authorIndex, 1);
    await writeAuthors(authors);

    return NextResponse.json({ message: 'Author deleted successfully' });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/authors - create a new author
export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.name || !data.slug) {
      return NextResponse.json({ error: 'Name and slug are required' }, { status: 400 });
    }

    const authors = await readAuthors();
    const existingAuthor = authors.find((a) => a.slug === data.slug);
    if (existingAuthor) {
      return NextResponse.json({ error: 'Author slug must be unique' }, { status: 400 });
    }

    const newAuthor = {
      id: uuidv4(),
      name: data.name,
      slug: data.slug,
      bio: data.bio || '',
      imageUrl: data.imageUrl || '',
      role: data.role || '',
      location: data.location || '',
      joinDate: data.joinDate || new Date().toISOString(),
      email: data.email || '',
      website: data.website || '',
      socialLinks: data.socialLinks || {},
      stats: data.stats || {
        articles: 0,
        followers: 0,
        totalViews: 0,
        totalLikes: 0,
      },
      expertise: data.expertise || [],
      specializations: data.specializations || [],
      achievements: data.achievements || [],
    };
    authors.push(newAuthor);
    await writeAuthors(authors);

    return NextResponse.json({ author: newAuthor }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
