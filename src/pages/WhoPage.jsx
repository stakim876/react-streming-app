import { useNavigate } from "react-router-dom";
import "./WhoPage.css";

export default function WhoPage() {
  const navigate = useNavigate();

  const profiles = [
    { id: 1, name: "김승태", avatar:"/assets/mickey.png"},
    { id: 2, name: "가족 계정", avatar: "https://i.pravatar.cc/150?img=2" },
    { id: 3, name: "게스트", avatar: "https://i.pravatar.cc/150?img=3" },
  ];

  const handleProfileClick = (profile) => {
    console.log("선택된 프로필:", profile.name);
    localStorage.setItem("selectedProfile", profile.name);
    navigate("/");
  };

  return (
    <div className="who-container">
      <h1 className="who-title">
        <span className="highlight">MoviePlay</span>에 오신 걸 환영합니다 🎬<br />
        <span>시청할 프로필을 선택하세요</span>
      </h1>

      <div className="profile-list">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="profile-card"
            onClick={() => handleProfileClick(profile)}
          >
            <img src={profile.avatar} alt={profile.name} />
            <p>{profile.name}</p>
          </div>
        ))}

        <div
          className="profile-card add-card"
          onClick={() => alert("프로필 추가 예정 기능")}
          >
          <span className="add-icon">＋</span>
          <p>프로필 추가</p>
        </div>
      </div>

      <button className="manage-btn" onClick={() => navigate("/profile")}>
        프로필 관리
      </button>
    </div>
  );
}
