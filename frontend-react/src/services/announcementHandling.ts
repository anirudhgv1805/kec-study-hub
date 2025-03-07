import { getFirestore, collection, getDocs, addDoc, onSnapshot, doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import app from "../firebase/firebase";
import { Announcement } from "../types/Announcement";

const db = getFirestore(app);

export const getAnnouncements = async () => {
    const announcementsCollection = collection(db, "announcements");
    const snapshot = await getDocs(announcementsCollection);
    const announcements = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
            id: doc.id,
            userId: data.userId,
            title: data.title,
            message: data.message,
            target: data.target,
            timestamp: data.timestamp,
            likes: data.likes,
            likedBy: data.likedBy
        } as Announcement;
    });
    return announcements;
};

export const postAnnouncement = async (announcement: Announcement) => {
    const announcementsCollection = collection(db, "announcements");
    await addDoc(announcementsCollection, { ...announcement, likedBy: [] });
};

export const subscribeToAnnouncements = (callback: (announcements: Announcement[]) => void) => {
    const announcementsCollection = collection(db, "announcements");
    return onSnapshot(announcementsCollection, (snapshot) => {
        const announcements = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                userId: data.userId,
                title: data.title,
                message: data.message,
                target: data.target,
                timestamp: data.timestamp,
                likes: data.likes,
                likedBy: data.likedBy
            } as Announcement;
        });
        callback(announcements);
    });
};

export const updateLikes = async (id: string, userId: string) => {
    const announcementDoc = doc(db, "announcements", id);
    const announcementSnapshot = await getDoc(announcementDoc);
    const announcementData = announcementSnapshot.data();

    if (announcementData && !announcementData.likedBy.includes(userId)) {
        await updateDoc(announcementDoc, {
            likes: announcementData.likes + 1,
            likedBy: arrayUnion(userId),
        });
    }
};