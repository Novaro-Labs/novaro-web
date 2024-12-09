import AvatarDemo from "@/assets/space-page/avatar-demo.png";

export default function SpaceProfile() {
  const userInfo = [
    { text: "post", count: "332" },
    { text: "follower", count: "1,200" },
    { text: "following", count: "240" },
  ];

  return (
    <div className="profile">
      <div className="edit cursor-pointer"></div>
      <div className="avatar-img rounded-full size-[120px] overflow-hidden">
        <img src={AvatarDemo} className="size-[120px]"/>
      </div>
      <div className="user-name">Esther Howard</div>
      <div className="user-acount">@Esther Howard</div>
      <div className="user-data">
        {userInfo.map(({ text, count }) => (
          <div className="info-item">
            <div className="info-count">{count}</div>
            <div className="info-text">{text}</div>
          </div>
        ))}
      </div>
      <div className="invitation">
        <div className="invitation-code">323 884</div>
        <div className="invitation-text">Invitation code</div>
        <div className="invitation-copy"></div>
      </div>
    </div>
  );
}
