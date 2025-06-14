import chefIcon from "./images/chef-claude-icon.png";

export default function Header() {
  return (
    <div className="header-bar">
      <div className="header-center">
        <div className="chef-logo-wrap">
          <img src={chefIcon} alt="Chef Claude" className="chef-logo" />
        </div>
        <span className="app-title">Chef Claude</span>
      </div>
    </div>
  );
}
