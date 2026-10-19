const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyAT1xtn2fSPbxUrIyJvK_r449D_WB6Ete8",
  authDomain: "gen-lang-client-0273291777.firebaseapp.com",
  projectId: "gen-lang-client-0273291777",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, "ai-studio-f7c7f3ec-1f6a-45a9-a332-4733fe85d918");

async function run() {
  try {
    await setDoc(doc(db, "admins", "lavtania@epicareer.com"), {
      role: "admin",
      email: "lavtania@epicareer.com"
    });
    console.log("Admin seeded");
  } catch (e) {
    console.error(e);
  }
  process.exit(0);
}
run();
