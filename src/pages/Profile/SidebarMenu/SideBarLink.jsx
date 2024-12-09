// SidebarLink.jsx
const SidebarLink = ({ to, title, icon, label, onClick }) => (
  <a
      href={to}
      onClick={onClick}
      title={title}
      className={`menu-item sidebar-link ${
          window.location.pathname === to ? "active" : ""
      }`}
  >
      {icon}
      <span className="txt-icon">{label}</span>
  </a>
);

export default SidebarLink;
