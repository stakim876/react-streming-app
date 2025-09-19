import { useNavigate } from "react-router-dom";
import "./WhoPage.css";

export default function WhoPage() {
  const navigate = useNavigate();

  const profiles = [
    { id: 1, name: "김승태", avatar: "https://i.pravatar.cc/150?img=1" },
    { id: 2, name: "가족 계정", avatar: "https://i.pravatar.cc/150?img=2" },
    { id: 3, name: "게스트", avatar: "https://i.pravatar.cc/150?img=3" },
  ];

  const handleProfileClick = (profile) => {
    console.log("선택된 프로필:", profile.name);
    navigate("/home");
  };

  return (
    <div className="who-container">
      <h1 className="who-title">누구세요?</h1>
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
      </div>
    </div>
  );
}
