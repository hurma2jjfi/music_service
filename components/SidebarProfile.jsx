"use client";

import React, { useEffect, useState } from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import '../styles/SidebarProfile.css';



export default function SidebarProfile({ onClose, onLogout, user }) {
  const [visible, setVisible] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  // Инициализация темы из localStorage или по умолчанию
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      // Автоматически ставим system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
      document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
    }
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => onClose(), 300);
  };

  // Переключатель темы
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <>
      <div
        className={`sidebar-backdrop ${visible ? "open" : ""}`}
        onClick={handleClose}
      />
      <aside className={`sidebar ${visible ? "open" : ""}`}>
        <div className="sidebar__header">
          <img src="/favicon.ico" alt="Avatar" className="sidebar__avatar" />
          <h2 className="sidebar__username">{user?.username || "User"}</h2>
          <p className="sidebar__email">{user?.email || "user@example.com"}</p>

        </div>

        {/* Toggle Switch */}
        <div className="theme-toggle" title="Переключить тему">
          <label className="switch">
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={toggleTheme}
            />
            <span className="slider round"></span>
          </label>

          <span className="theme-label">{theme === "light" ? "Dark" : "White"}</span>
          
        </div>

        <button className="sidebar__logout-button" onClick={onLogout}>
          <LogoutIcon className="logout__icon" />
          Выйти
        </button>
      </aside>
    </>
  );
}
