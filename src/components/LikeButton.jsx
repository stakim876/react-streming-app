import { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';

export default function LikeButton({ movie }) {
  const { currentUser } = useAuth();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const checkLiked = async () => {
      if (!currentUser) return;
      const docRef = doc(db, 'users', currentUser.uid, 'likes', String(movie.id));
      const docSnap = await getDoc(docRef);
      setLiked(docSnap.exists());
    };

    checkLiked();
  }, [currentUser, movie.id]);

  const toggleLike = async () => {
    if (!currentUser) return alert('로그인이 필요합니다');
    const docRef = doc(db, 'users', currentUser.uid, 'likes', String(movie.id));

    if (liked) {
      await deleteDoc(docRef);
    } else {
      await setDoc(docRef, {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        timestamp: Date.now(),
      });
    }
    setLiked(!liked);
  };

  return (
    <div onClick={toggleLike} style={{ position: 'absolute', top: 8, right: 8, cursor: 'pointer' }}>
      {liked ? <FaHeart color="red" /> : <FaRegHeart color="white" />}
    </div>
  );
}
