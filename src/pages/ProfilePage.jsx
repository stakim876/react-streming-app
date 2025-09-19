import "./ProfilePage.css";

const profiles = [
  { id: 1, name: "내 프로필", img: "/avatars/mickey.png" },
  { id: 2, name: "가족", img: "/avatars/rapunzel.png" },
];

export default function ProfileSelect() {
  return (
    <div className="profile-select">
      <h2>프로필 선택</h2>
      <div className="profile-grid">
        {profiles.map((p) => (
          <div key={p.id} className="profile-card">
            <div className="avatar-wrapper">
              <img src={p.img} alt={p.name} className="avatar" />
              <button className="edit-btn">✏️</button>
            </div>
            <p className="profile-name">{p.name}</p>
          </div>
        ))}
        <div className="profile-card add-profile">
          <div className="avatar-wrapper">
            <span className="plus">+</span>
          </div>
          <p className="profile-name">프로필 추가</p>
        </div>
      </div>
    </div>
  );
}
