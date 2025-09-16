import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function getMoviesFromFirestore(category) {
  const colRef = collection(db, `movies_${category}`);
  const snap = await getDocs(colRef);
  return snap.docs.map((doc) => doc.data());
}
