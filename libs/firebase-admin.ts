import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_URL_PROJECT_ID,
      clientEmail: process.env.NEXT_PUBLIC_URL_FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.NEXT_PUBLIC_URL_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
    databaseURL: process.env.NEXT_PUBLIC_URL_DATABASE_URL,
  });
}

const adminDb = admin.firestore();

export { admin, adminDb };
