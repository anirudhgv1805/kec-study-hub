import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from "../firebase/firebase";

const db = getFirestore(app);

export const getNotes = async () => {
    const notesCollection = collection(db, "notes");
    const snapshot = await getDocs(notesCollection);
    const notes = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return notes;
};