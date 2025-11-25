import { NextRequest, NextResponse } from 'next/server';
import * as admin from 'firebase-admin';

const serviceAccount = {
  type: 'service_account',
  project_id: 'getknowledge-e954a',
  private_key_id: '231c1707a5941fd22c3cd7d66f553bdea4406122',
  private_key: `-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDnVS/W7el+R9sB\nz7sW6EhykJ2RmN2OxCppLX/90yO92kfjKtuAWBPq/vJKjee+HERZPhpCjC/7dP+z\nh3cujZ53bj9Y+l7oFFlEuILv14C76V51Co5l50hlItuQEZRLynI86Ztv03wuWj0z\nJPQMdURTZw7mN+yRgkoqTrLWemMOes5XIKl8Mxxh7freRA2TMcbLjwONqu7fqSeV\n0kJrXfG6jwmxnMeNgby+eDNooCIgqKTMEQV+shgi9vQPS78em0x1HhdxDJ+V0+sY\n+l0ry9sXyQCkvgc7gV+yXfGTclvVkDBk2z6ts08InQBT0p15BPphaJf4BNdUEsdR\nloVogYZzAgMBAAECggEAXCqtj8VkVQLN+A/Kq5rKWpLRpJOyGlJ/zz3ok7mOsPKJ\n17FYmO7+qI8A+8FEBpN+i8vZbJAsAdSgl+euDWcxLsZHCO1f6LlKw717tZE34iZd\nkuYsy971Eg5sSh8m5Xd4QlqUql4pSNJ9NaZQcbI7EbuqzQCVCXhOkkKesCM82iRD\nrGu1aCud/vHG73eY6jh6fk4UIx3xkL1ilWVD0hnH4DhELIzeIpBsZ3jzDdm6cZUJ\nyED8rgINNNbtntEtVGamVo5VIB8v/XnKq6f+ultAxu/jQj34d6JJsPv2p4xSH0fH\nQWemtb1eDIsTGCe76ORjXoOOM8yD/r7jRjEHunux0QKBgQD00z5nvCRqLtFglZDW\nn64Dq//dU94ZtIZ75+ovTirLwlbAcJNeBETGp2eGAhvyfT7QRbxKGzacG7vYyjz2\nIM/A+SaZoT8A2B7FFclIZKpsQqXIAETT+fk60pSUtpNRHadlSmXiKXrVdAF+CweQ\nTUae2plMGf8DnFWw5Li023QmOQKBgQDx5EklEudKfn1Itbf3SzDPk6z4O142w3mf\nK9MZ5SIHvjJXRCTyIBThsrv7j/EPVwX9TEWu29exGZfPuurNSjC80URy0RCcm2UL\nwxCqFYQhqTy66TCDliKvnLL7qvKxYrOAc56gZcmNGgrwNTc2OaIjYNupkD9/d4MG\nv1ZUcXLyCwKBgEO2gVYTlUbA+CvscgjKVUiys6u1XIJjiaaPeBfpWLDOaUwEVt3z\n9Em1V06bGruwpETaZL9iU3JNwWCuXrn8TTmkL2biUBidrbT415jsLq6OqGdum5q9\nUo9QWsPe01PmDbxYHWG180FCOn9v8YGZveSFtUx1DDEldhXczLFI2RERAoGBALde\nWDibkOw+4RiKcPAtds4U4821q6EWJA+OuFPsCBUYkK7owJ0vxsSlqq10G8iGLssq\n07RPgb4GabgWuUJwmGu6tAnaBJ7DiiEVeX+GGgkucxQ6DAXkfVzlDCWOHLZt3Sdl\n/n0XTGgDswEPRlB79jadiUeMSyaE4bXuvDH9YqarAoGASeb3GAHErgBFNbNH58W0\nf+b4Ax2dF6q17huwU2ej97tLOoq5vp1hKWkI69d0CFVvKNcO6lItJM3ZIPTvubNA\nMa5DeK/47PEwp+IDt+p/KUZNFkYgLz7+sYcEOTfugKWTHQ8y7w3zCpC/tpXt1ke+\nuxL6burBZSirdPey5KM1zds=\n-----END PRIVATE KEY-----\n`,
  client_email: 'firebase-adminsdk-fbsvc@getknowledge-e954a.iam.gserviceaccount.com',
  client_id: '102059478593780899005',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40getknowledge-e954a.iam.gserviceaccount.com',
  universe_domain: 'googleapis.com',
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

const adminAuth = admin.auth();

export async function GET() {
  try {
    const user = await adminAuth.getUserByEmail('admin@gmail.com');
    return NextResponse.json({
      message: 'Admin user exists',
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      disabled: user.disabled,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'User not found' },
      { status: 404 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    const password = "1234";

    // Create user with Firebase Admin SDK
    const userRecord = await adminAuth.createUser({
      email,
      password,
      emailVerified: true,
    });

    return NextResponse.json({
      message: 'Admin user created successfully',
      uid: userRecord.uid,
      email: userRecord.email,
    });
  } catch (error: any) {
    console.error('Error creating admin user:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create admin user' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { password } = await request.json();

    const user = await adminAuth.getUserByEmail('admin@gmail.com');
    await adminAuth.updateUser(user.uid, {
      password,
    });

    return NextResponse.json({ message: 'Password updated successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const user = await adminAuth.getUserByEmail('admin@gmail.com');
    await adminAuth.deleteUser(user.uid);
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}
