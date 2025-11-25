import { NextRequest, NextResponse } from 'next/server';
import { adminFirestore } from '@/lib/firebase-admin';
import { adminAuth } from '@/lib/firebase-admin';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // First try to find by ID
    let docRef = adminFirestore.collection('blogs').doc(id);
    let doc = await docRef.get();

    // If not found by ID, try to find by slug
    if (!doc.exists) {
      const snapshot = await adminFirestore.collection('blogs').where('slug', '==', id).limit(1).get();
      if (!snapshot.empty) {
        doc = snapshot.docs[0];
        docRef = doc.ref;
      }
    }

    if (!doc.exists) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    const blogData = doc.data();

    // Increment view count
    await docRef.update({
      views: (blogData?.views || 0) + 1,
      updatedAt: new Date(),
    });

    const blog = {
      id: doc.id,
      ...blogData,
      createdAt: blogData?.createdAt?.toDate?.()?.toISOString() || blogData?.createdAt,
      updatedAt: blogData?.updatedAt?.toDate?.()?.toISOString() || blogData?.updatedAt,
    };

    return NextResponse.json(blog);
  } catch (error: any) {
    console.error('Error fetching blog:', error);
    // Return not found instead of 500 error
    return NextResponse.json(
      { error: 'Blog not found' },
      { status: 404 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = await adminAuth.verifyIdToken(token);

    const { title, excerpt, content, category, image, tags, published } = await request.json();

    const updateData: any = {
      updatedAt: new Date(),
    };

    if (title !== undefined) updateData.title = title;
    if (excerpt !== undefined) updateData.excerpt = excerpt;
    if (content !== undefined) updateData.content = content;
    if (category !== undefined) updateData.category = category;
    if (image !== undefined) updateData.image = image;
    if (tags !== undefined) updateData.tags = tags;
    if (published !== undefined) updateData.published = published;

    const { id } = await params;
    await adminFirestore.collection('blogs').doc(id).update(updateData);

    return NextResponse.json({
      message: 'Blog updated successfully',
    });
  } catch (error: any) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { error: 'Failed to update blog' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    await adminAuth.verifyIdToken(token);

    const { id } = await params;
    await adminFirestore.collection('blogs').doc(id).delete();

    return NextResponse.json({
      message: 'Blog deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog' },
      { status: 500 }
    );
  }
}
