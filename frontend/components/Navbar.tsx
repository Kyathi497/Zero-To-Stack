"use client";

export default function Navbar() {
  return (
    <nav className="nav">
      <a href="#cover" className="logo">
        <div className="logo-mark">Z</div>
        <span>Zero to <b style={{ color: "var(--orange)" }}>Stack</b></span>
      </a>
      <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
        <a href="#curriculum" className="nav-link">Curriculum</a>
        <a href="#projects" className="nav-link">Projects</a>
        <a href="#faq" className="nav-link">FAQ</a>
        <a href="#enroll" className="nav-cta">Enroll</a>
      </div>
    </nav>
  );
}