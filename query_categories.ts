import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, limit } from "firebase/firestore";
const firebaseConfig = { apiKey: "AIzaSyAT1xtn2fSPbxUrIyJvK_r449D_WB6Ete8", authDomain: "gen-lang-client-0273291777.firebaseapp.com", projectId: "gen-lang-client-0273291777", storageBucket: "gen-lang-client-0273291777.firebasestorage.app", messagingSenderId: "235978759653", appId: "1:235978759653:web:fb82260c62f98fc80ce30c" };
const fbApp = initializeApp(firebaseConfig);
const db = getFirestore(fbApp, "ai-studio-f7c7f3ec-1f6a-45a9-a332-4733fe85d918");
async function run() {
  const catRef = collection(db, "blog_categories");
  const snap = await getDocs(query(catRef, limit(10)));
  console.log("blog_categories:", snap.docs.map(d => ({id: d.id, ...d.data()})));
  const postRef = collection(db, "blog_posts");
  const psnap = await getDocs(query(postRef, limit(2)));
  console.log("blog_posts sample:", psnap.docs.map(d => ({id: d.id, categories: d.data().categories})));
}
run();
