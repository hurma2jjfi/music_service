"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SettingsIcon from '@mui/icons-material/Settings';
import SidebarProfile from "./SidebarProfile";
import "../styles/Header.css";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();


  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    if (token) {
      fetch('/api/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => {
          if (!res.ok) {
            if (res.status === 401 || res.status === 404) {
              localStorage.removeItem("token");
              setIsLoggedIn(false);
              router.push("/login");
            }
            throw new Error("Failed to fetch user data");
          }
          return res.json();
        })
        .then(data => {
          setUser(data);
        })
        .catch(error => {
          console.error("Ошибка загрузки пользователя:", error);
          setUser(null);
          setIsLoggedIn(false);
        });
    } else {
      setUser(null);
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setSidebarOpen(false);
    setUser(null);
    router.push("/login");
  };

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      <header className="header">
        <nav className="navigation">
          <div className="logo">
            <Link href="/">
              <div className="fl__container">
                <img src="/favicon.ico" alt="Логотип сайта" width={32} height={32} />
                <h1>Potify</h1>
              </div>
            </Link>
          </div>

          <ul className="menu">
            {isLoggedIn ? (
              <li className="menu__item">
                <button
                  className="button button--outline"
                  onClick={openSidebar}
                  style={{ cursor: "pointer" }}
                >
                  <SettingsIcon className="profile__icon" />
                </button>
              </li>
            ) : (
              <>
                <li className="menu__item">
                  <Link href="/login" className="button button--outline">
                    Вход
                  </Link>
                </li>
                <li className="menu__item">
                  <Link href="/register" className="button button--filled">
                    Регистрация
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>

      {sidebarOpen && isLoggedIn && user && (
        <SidebarProfile onClose={closeSidebar} onLogout={handleLogout} user={user} />
      )}
    </>
  );
}
