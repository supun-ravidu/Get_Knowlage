import { NextRequest, NextResponse } from 'next/server';
import { adminFirestore } from '@/lib/firebase-admin';

export async function GET(request: NextRequest) {
  try {
    const blogsRef = adminFirestore.collection('blogs');
    // Try the query, but if it fails due to missing index, fall back to simpler query
    let snapshot;
    try {
      snapshot = await blogsRef.where('published', '==', true).orderBy('createdAt', 'desc').get();
    } catch (indexError) {
      console.warn('Index not available, falling back to published blogs without ordering');
      snapshot = await blogsRef.where('published', '==', true).get();
    }

    const blogs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt,
      updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || doc.data().updatedAt,
    }));

    return NextResponse.json({ blogs });
  } catch (error: any) {
    console.error('Error fetching blogs:', error);
    // Return empty array instead of error to allow fallback to sample data
    return NextResponse.json({ blogs: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    // For testing purposes, allow creating blogs without auth
    // In production, this should require admin authentication
    const { title, excerpt, content, category, image, tags, published, author, slug } = await request.json();

    const blogData = {
      title,
      excerpt,
      content,
      category: category || 'General',
      image: image || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
      tags: tags || [],
      published: published !== undefined ? published : true,
      author: author || 'Admin',
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      views: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const docRef = await adminFirestore.collection('blogs').add(blogData);

    return NextResponse.json({
      message: 'Blog created successfully',
      id: docRef.id,
    });
  } catch (error: any) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { error: 'Failed to create blog' },
      { status: 500 }
    );
  }
}
