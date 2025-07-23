import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function ProfilePage() {
  const [userInfo, setUserInfo] = useState(null);
  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState('');

  const fetchUserInfo = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      setUserInfo(data);
      setDisplayName(data.displayName || '');
    }
  };

  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const docRef = doc(db, 'users', user.uid);
    await updateDoc(docRef, {
      displayName,
    });

    setEditing(false);
    fetchUserInfo(); // 정보 다시 불러오기
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  if (!userInfo) return <div style={{ color: '#fff' }}>로딩 중...</div>;

  return (
    <div style={{ padding: '2rem', color: '#fff' }}>
      <h1>프로필</h1>
      <p><strong>이메일:</strong> {auth.currentUser.email}</p>

      {editing ? (
        <>
          <input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="이름 입력"
          />
          <button onClick={handleSave}>저장</button>
        </>
      ) : (
        <>
          <p><strong>이름:</strong> {userInfo.displayName || '(없음)'}</p>
          <button onClick={() => setEditing(true)}>수정</button>
        </>
      )}
    </div>
  );
}
