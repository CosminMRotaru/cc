export default function Header() {
  return (
    <header className="header-bar">
      <div className="flex items-center gap-[28px]">
        <div className="chef-logo-wrap">
          <img
            src="/src/images/chef-claude-icon.png"
            alt="Chef Claude logo"
            className="chef-logo"
          />
        </div>
        <h1 className="app-title">Chef Claude</h1>
      </div>
    </header>
  );
}
