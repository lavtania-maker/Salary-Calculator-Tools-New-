import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import fs from 'fs';

const cfg = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));
const app = initializeApp(cfg);
const db = getFirestore(app, cfg.firestoreDatabaseId);

async function run() {
  try {
    const querySnapshot = await getDocs(collection(db, "blog_posts"));
    console.log("Success, got docs:", querySnapshot.size);
  } catch (e) {
    console.error("Error:", e.message);
  }
}
run();
