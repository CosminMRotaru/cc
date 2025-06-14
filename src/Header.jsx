import chefIcon from "./images/chef-claude-icon.png";

export default function Header() {
  return (
    <header className="header-center">
      <img src={chefIcon} alt="Chef Claude" className="chef-logo" />
      <span className="app-title">Chef Claude</span>
    </header>
  );
}
