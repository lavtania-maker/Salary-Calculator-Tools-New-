import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAT1xtn2fSPbxUrIyJvK_r449D_WB6Ete8",
  authDomain: "gen-lang-client-0273291777.firebaseapp.com",
  projectId: "gen-lang-client-0273291777",
  storageBucket: "gen-lang-client-0273291777.firebasestorage.app",
  messagingSenderId: "235978759653",
  appId: "1:235978759653:web:fb82260c62f98fc80ce30c"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app, "ai-studio-f7c7f3ec-1f6a-45a9-a332-4733fe85d918");

async function run() {
  const postsRef = collection(db, "blog_posts");
  const q = query(postsRef, where("slug", "==", "basic-salary-vs-gross-salary-vs-net-salary-in-malaysia-whats-the-difference"));
  const snapshot = await getDocs(q);
  snapshot.forEach(doc => {
    console.log(doc.data().content);
  });
}
run();
