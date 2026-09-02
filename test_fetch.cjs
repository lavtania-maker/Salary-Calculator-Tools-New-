const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs, query, where, orderBy } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyAT1xtn2fSPbxUrIyJvK_r449D_WB6Ete8",
  projectId: "gen-lang-client-0273291777"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, "ai-studio-f7c7f3ec-1f6a-45a9-a332-4733fe85d918");

async function run() {
  try {
    const q = query(collection(db, "blog_posts"), where("status", "==", "published"), orderBy("publishedAt", "desc"));
    const snap = await getDocs(q);
    console.log("Success with orderBy, count:", snap.docs.length);
  } catch (err) {
    console.error("Error with orderBy:", err.message);
  }
}
run();
