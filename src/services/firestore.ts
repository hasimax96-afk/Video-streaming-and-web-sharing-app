import {
  collection, doc, setDoc, deleteDoc, getDocs, getDoc, query, where,
  orderBy, onSnapshot, addDoc, serverTimestamp, updateDoc, increment, Timestamp
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/firebase/config";

// ---- Likes ----
export const toggleLike = async (videoId: string, uid: string) => {
  const likeRef = doc(db, "likes", `${videoId}__${uid}`);
  const snap = await getDoc(likeRef);
  if (snap.exists()) {
    await deleteDoc(likeRef);
    return false;
  } else {
    await setDoc(likeRef, { videoId, uid, createdAt: serverTimestamp() });
    return true;
  }
};

export const getLikeCount = (videoId: string, cb: (count: number) => void) => {
  const q = query(collection(db, "likes"), where("videoId", "==", videoId));
  return onSnapshot(q, (snap) => cb(snap.size));
};

export const hasUserLiked = async (videoId: string, uid: string): Promise<boolean> => {
  const snap = await getDoc(doc(db, "likes", `${videoId}__${uid}`));
  return snap.exists();
};

// ---- Comments ----
export interface CommentData {
  id: string;
  videoId: string;
  uid: string;
  userName: string;
  userAvatar: string;
  text: string;
  createdAt: Timestamp | null;
}

export const addComment = async (videoId: string, uid: string, userName: string, userAvatar: string, text: string) => {
  await addDoc(collection(db, "comments"), {
    videoId, uid, userName, userAvatar, text, createdAt: serverTimestamp(),
  });
};

export const deleteComment = async (commentId: string) => {
  await deleteDoc(doc(db, "comments", commentId));
};

export const subscribeComments = (videoId: string, cb: (comments: CommentData[]) => void) => {
  const q = query(collection(db, "comments"), where("videoId", "==", videoId), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snap) => {
    cb(snap.docs.map((d) => ({ id: d.id, ...d.data() } as CommentData)));
  });
};

// ---- Subscriptions ----
export const toggleSubscription = async (channelId: string, uid: string) => {
  const subRef = doc(db, "subscriptions", `${channelId}__${uid}`);
  const snap = await getDoc(subRef);
  if (snap.exists()) {
    await deleteDoc(subRef);
    return false;
  } else {
    await setDoc(subRef, { channelId, uid, createdAt: serverTimestamp() });
    return true;
  }
};

export const getSubscriberCount = (channelId: string, cb: (count: number) => void) => {
  const q = query(collection(db, "subscriptions"), where("channelId", "==", channelId));
  return onSnapshot(q, (snap) => cb(snap.size));
};

export const isUserSubscribed = async (channelId: string, uid: string): Promise<boolean> => {
  const snap = await getDoc(doc(db, "subscriptions", `${channelId}__${uid}`));
  return snap.exists();
};

// ---- Video Uploads ----
export interface UploadMetadata {
  title: string;
  description: string;
  category: string;
  tags: string[];
  uid: string;
  userName: string;
  userAvatar: string;
}

export const uploadVideo = (
  videoFile: File,
  thumbnailFile: File,
  metadata: UploadMetadata,
  onProgress: (pct: number) => void,
  onComplete: (videoId: string) => void,
  onError: (err: Error) => void
) => {
  const videoRef = ref(storage, `videos/${Date.now()}_${videoFile.name}`);
  const task = uploadBytesResumable(videoRef, videoFile);

  task.on("state_changed",
    (snap) => onProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100)),
    onError,
    async () => {
      try {
        const videoUrl = await getDownloadURL(task.snapshot.ref);
        const thumbRef = ref(storage, `thumbnails/${Date.now()}_${thumbnailFile.name}`);
        const thumbSnap = await uploadBytesResumable(thumbRef, thumbnailFile);
        const thumbnailUrl = await getDownloadURL(thumbSnap.ref);

        const docRef = await addDoc(collection(db, "uploads"), {
          ...metadata,
          videoUrl,
          thumbnailUrl,
          views: 0,
          createdAt: serverTimestamp(),
        });
        onComplete(docRef.id);
      } catch (e) {
        onError(e as Error);
      }
    }
  );
};

export const getUserUploads = async (uid: string) => {
  const q = query(collection(db, "uploads"), where("uid", "==", uid), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

// ---- Watch History ----
export const addToHistory = async (uid: string, videoId: string, title: string, thumbnail: string, channelTitle: string) => {
  await setDoc(doc(db, "history", uid, "videos", videoId), {
    videoId, title, thumbnail, channelTitle, watchedAt: serverTimestamp(),
  });
};

export const getHistory = async (uid: string) => {
  const q = query(collection(db, "history", uid, "videos"), orderBy("watchedAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data());
};

// ---- Favorites ----
export const toggleFavorite = async (uid: string, videoId: string, title: string, thumbnail: string, channelTitle: string) => {
  const favRef = doc(db, "favorites", uid, "videos", videoId);
  const snap = await getDoc(favRef);
  if (snap.exists()) {
    await deleteDoc(favRef);
    return false;
  } else {
    await setDoc(favRef, { videoId, title, thumbnail, channelTitle, savedAt: serverTimestamp() });
    return true;
  }
};

export const getFavorites = async (uid: string) => {
  const q = query(collection(db, "favorites", uid, "videos"), orderBy("savedAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data());
};

// ---- View Counter ----
export const incrementViews = async (videoId: string) => {
  const viewRef = doc(db, "viewCounts", videoId);
  const snap = await getDoc(viewRef);
  if (snap.exists()) {
    await updateDoc(viewRef, { count: increment(1) });
  } else {
    await setDoc(viewRef, { count: 1 });
  }
};

export const getViewCount = async (videoId: string): Promise<number> => {
  const snap = await getDoc(doc(db, "viewCounts", videoId));
  return snap.exists() ? (snap.data().count || 0) : 0;
};
