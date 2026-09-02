import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAT1xtn2fSPbxUrIyJvK_r449D_WB6Ete8",
  projectId: "gen-lang-client-0273291777"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, "ai-studio-f7c7f3ec-1f6a-45a9-a332-4733fe85d918");

async function run() {
  const q = query(collection(db, "blog_posts"), where("status", "==", "published"));
  const snap = await getDocs(q);
  snap.docs.forEach(d => {
    const data = d.data();
    console.log(d.id, typeof data.publishedAt, data.publishedAt?.toDate ? "Timestamp" : "Not Timestamp", data.publishedAt);
  });
}
run();
