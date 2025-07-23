import { useState } from 'react';
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = async () => {
    try {
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      setMessage('비밀번호 변경 성공!');
    } catch (error) {
      setMessage('오류: ' + error.message);
    }
  };

  return (
    <div>
      <h1>비밀번호 변경</h1>
      <input placeholder="현재 비밀번호" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} type="password" />
      <input placeholder="새 비밀번호" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" />
      <button onClick={handleChangePassword}>변경하기</button>
      <p>{message}</p>
    </div>
  );
}
