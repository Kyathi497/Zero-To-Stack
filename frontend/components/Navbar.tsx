"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:3001/auth/me", {
          credentials: "include",
        });
        setIsLoggedIn(res.ok);
      } catch {
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

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
        {isLoggedIn ? (
          <Link href="/dashboard/student" className="nav-cta">Dashboard</Link>
        ) : (
          <>
            <Link href="/login" className="nav-link">Login</Link>
            <Link href="/register" className="nav-cta">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}