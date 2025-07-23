// src/pages/AdminPage.jsx
import { useAuth } from "../context/AuthContext";

export default function AdminPage() {
  const { userInfo } = useAuth();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎛 관리자 페이지</h1>
      <div style={styles.card}>
        <p><strong>이름:</strong> {userInfo?.displayName || "이름 없음"}</p>
        <p><strong>이메일:</strong> {userInfo?.email}</p>
        <p><strong>권한:</strong> {userInfo?.role}</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem",
    color: "#fff",
    backgroundColor: "#0d1117",
    minHeight: "100vh",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "1.5rem",
  },
  card: {
    backgroundColor: "#161b22",
    padding: "1.5rem",
    borderRadius: "0.5rem",
    boxShadow: "0 0 10px rgba(0,0,0,0.4)",
    lineHeight: "1.8",
  },
};
