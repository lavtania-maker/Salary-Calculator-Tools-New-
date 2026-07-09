import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import fs from 'fs';

const cfg = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));
const app = initializeApp(cfg);
const db = getFirestore(app, cfg.firestoreDatabaseId);

async function run() {
  try {
    const docRef = await addDoc(collection(db, "leads"), {
      email: "test@test.com",
      action: "test",
      createdAt: "2026-07-09T00:00:00Z",
      userType: "Jobseeker"
    });
    console.log("Success:", docRef.id);
  } catch (e) {
    console.error("Error:", e.message);
  }
}
run();
