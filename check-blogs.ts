import { initializeApp } from "firebase/app";
import { initializeFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAT1xtn2fSPbxUrIyJvK_r449D_WB6Ete8",
  authDomain: "gen-lang-client-0273291777.firebaseapp.com",
  projectId: "gen-lang-client-0273291777",
};
const DB_ID = "ai-studio-f7c7f3ec-1f6a-45a9-a332-4733fe85d918";
const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, { experimentalForceLongPolling: true }, DB_ID);

async function check() {
  const q = collection(db, "blog_posts");
  const snap = await getDocs(q);
  console.log(`Found ${snap.size} posts.`);
  snap.forEach(doc => console.log(doc.id, doc.data().slug));
}
check().catch(console.error);
