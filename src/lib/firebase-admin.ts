import * as admin from 'firebase-admin';

const serviceAccount = {
  type: 'service_account',
  project_id: 'getknowledge-e954a',
  private_key_id: '231c1707a5941fd22c3cd7d66f553bdea4406122',
  private_key: `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDnVS/W7el+R9sB
z7sW6EhykJ2RmN2OxCppLX/90yO92kfjKtuAWBPq/vJKjee+HERZPhpCjC/7dP+z
h3cujZ53bj9Y+l7oFFlEuILv14C76V51Co5l50hlItuQEZRLynI86Ztv03wuWj0z
JPQMdURTZw7mN+yRgkoqTrLWemMOes5XIKl8Mxxh7freRA2TMcbLjwONqu7fqSeV
0kJrXfG6jwmxnMeNgby+eDNooCIgqKTMEQV+shgi9vQPS78em0x1HhdxDJ+V0+sY
+l0ry9sXyQCkvgc7gV+yXfGTclvVkDBk2z6ts08InQBT0p15BPphaJf4BNdUEsdR
loVogYZzAgMBAAECggEAXCqtj8VkVQLN+A/Kq5rKWpLRpJOyGlJ/zz3ok7mOsPKJ
17FYmO7+qI8A+8FEBpN+i8vZbJAsAdSgl+euDWcxLsZHCO1f6LlKw717tZE34iZd
kuYsy971Eg5sSh8m5Xd4QlqUql4pSNJ9NaZQcbI7EbuqzQCVCXhOkkKesCM82iRD
rGu1aCud/vHG73eY6jh6fk4UIx3xkL1ilWVD0hnH4DhELIzeIpBsZ3jzDdm6cZUJ
yED8rgINNNbtntEtVGamVo5VIB8v/XnKq6f+ultAxu/jQj34d6JJsPv2p4xSH0fH
QWemtb1eDIsTGCe76ORjXoOOM8yD/r7jRjEHunux0QKBgQD00z5nvCRqLtFglZDW
n64Dq//dU94ZtIZ75+ovTirLwlbAcJNeBETGp2eGAhvyfT7QRbxKGzacG7vYyjz2
IM/A+SaZoT8A2B7FFclIZKpsQqXIAETT+fk60pSUtpNRHadlSmXiKXrVdAF+CweQ
TUae2plMGf8DnFWw5Li023QmOQKBgQDx5EklEudKfn1Itbf3SzDPk6z4O142w3mf
K9MZ5SIHvjJXRCTyIBThsrv7j/EPVwX9TEWu29exGZfPuurNSjC80URy0RCcm2UL
wxCqFYQhqTy66TCDliKvnLL7qvKxYrOAc56gZcmNGgrwNTc2OaIjYNupkD9/d4MG
v1ZUcXLyCwKBgEO2gVYTlUbA+CvscgjKVUiys6u1XIJjiaaPeBfpWLDOaUwEVt3z
9Em1V06bGruwpETaZL9iU3JNwWCuXrn8TTmkL2biUBidrbT415jsLq6OqGdum5q9
Uo9QWsPe01PmDbxYHWG180FCOn9v8YGZveSFtUx1DDEldhXczLFI2RERAoGBALde
WDibkOw+4RiKcPAtds4U4821q6EWJA+OuFPsCBUYkK7owJ0vxsSlqq10G8iGLssq
07RPgb4GabgWuUJwmGu6tAnaBJ7DiiEVeX+GGgkucxQ6DAXkfVzlDCWOHLZt3Sdl
/n0XTGgDswEPRlB79jadiUeMSyaE4bXuvDH9YqarAoGASeb3GAHErgBFNbNH58W0
f+b4Ax2dF6q17huwU2ej97tLOoq5vp1hKWkI69d0CFVvKNcO6lItJM3ZIPTvubNA
Ma5DeK/47PEwp+IDt+p/KUZNFkYgLz7+sYcEOTfugKWTHQ8y7w3zCpC/tpXt1ke+
uxL6burBZSirdPey5KM1zds=
-----END PRIVATE KEY-----`,
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

export const adminAuth = admin.auth();
export const adminFirestore = admin.firestore();
