import { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import './SignUpPage.css';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [emailChecked, setEmailChecked] = useState(false);

  const checkEmail = async () => {
    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.length > 0) {
        alert('이미 사용 중인 이메일입니다.');
        setEmailChecked(false);
      } else {
        alert('사용 가능한 이메일입니다.');
        setEmailChecked(true);
      }
    } catch (error) {
      alert('이메일 확인 오류: ' + error.message);
    }
  };

  const handleSignUp = async () => {
    if (!emailChecked) return alert('이메일 중복 확인을 해주세요.');
    if (!name || !gender) return alert('이름과 성별을 입력해주세요.');
    if (password !== confirmPassword) return alert('비밀번호가 일치하지 않습니다.');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Firestore에 유저 정보 저장
      await setDoc(doc(db, 'users', user.uid), {
        email,
        name,
        gender,
        createdAt: serverTimestamp(),
        uid: user.uid,
        role: 'user',
      });

      alert('회원가입이 완료되었습니다.');
    } catch (error) {
      alert('회원가입 오류: ' + error.message);
    }
  };

  return (
    <div className="signup-page">
      <h1>회원가입</h1>
      <input
        type="text"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={checkEmail}>중복 확인</button>

      <input
        type="text"
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div className="gender-group">
        <label>
          <input
            type="radio"
            value="남성"
            checked={gender === '남성'}
            onChange={(e) => setGender(e.target.value)}
          />
          남성
        </label>
        <label>
          <input
            type="radio"
            value="여성"
            checked={gender === '여성'}
            onChange={(e) => setGender(e.target.value)}
          />
          여성
        </label>
      </div>

      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder="비밀번호 확인"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button onClick={handleSignUp}>가입하기</button>
    </div>
  );
}
