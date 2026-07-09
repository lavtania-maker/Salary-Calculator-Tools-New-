import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import fs from 'fs';

const cfg = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));
const app = initializeApp(cfg);
const db = getFirestore(app, "ai-studio-f7c7f3ec-1f6a-45a9-a332-4733fe85d918");

async function run() {
  try {
    const q = await getDocs(collection(db, "blog_posts"));
    console.log("Success:", q.size);
  } catch (e) {
    console.error("Error:", e.message);
  }
}
run();
