import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./LoginPage.css";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    try {
      await login(email, password);
      console.log("✅ 로그인 성공:", email);
      navigate("/who"); 
    } catch (err) {
      console.error("❌ 로그인 실패:", err.code, err.message);
      setError(`로그인 실패: ${err.code} - ${err.message}`);
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2 className="login-title">로그인</h2>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit" className="login-btn">
          로그인
        </button>
        <p className="signup-link">
          아직 계정이 없나요? <Link to="/signup">회원가입</Link>
        </p>
      </form>
    </div>
  );
}
