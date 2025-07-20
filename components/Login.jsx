"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiOutlineExclamationCircle } from "react-icons/ai"; // импорт ошибки
import "../styles/Login.css";
import { ClipLoader } from "react-spinners";



export default function Login() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Ошибка входа");
      } else {
        localStorage.setItem("token", data.token);
        router.push("/");
      }
    } catch {
      setError("Ошибка сети или сервера");
    }
    setLoading(false);
  };

  // Простая валидация email и password на заполненность для подсветки
  const hasErrorEmail = touched.email && !form.email;
  const hasErrorPassword = touched.password && !form.password;

  return (
    <div className="login__roditel">
      <div className="login__wrapper">
        <div className="logo">
          <img src="/favicon.ico" alt="Логотип сайта" width={32} height={32} />
        </div>
        <h1 className="title">Sign in to Potify</h1>

        <div className="container">
          <div className="wrapper">
            <form onSubmit={handleSubmit} noValidate>
              <div className="first-col" style={{ position: "relative" }}>
                <label htmlFor="email">Email*:</label>
                <input
                  className={`email ${hasErrorEmail ? "input-error" : ""}`}
                  type="email"
                  name="email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {hasErrorEmail && (
                  <AiOutlineExclamationCircle 
                    color="red" 
                    size={20} 
                    style={{ position: "absolute", right: 10, top: 38 }} 
                    title="Обязательное поле"
                  />
                )}
              </div>
              <div className="two-col" style={{ position: "relative" }}>
                <label htmlFor="password">Password*:</label>
                <input
                  className={hasErrorPassword ? "input-error" : ""}
                  type="password"
                  name="password"
                  id="password"
                  value={form.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {hasErrorPassword && (
                  <AiOutlineExclamationCircle 
                    color="red" 
                    size={20} 
                    style={{ position: "absolute", right: 10, top: 38 }} 
                    title="Обязательное поле"
                  />
                )}
              </div>

              <button className="login" type="submit" disabled={loading}>
              {loading ? <ClipLoader size={20} color="#ffffff" /> : "Sign in"}
              </button>
            </form>

            {error && (
              <p style={{ color: "red", fontSize: "14px", marginTop: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <AiOutlineExclamationCircle /> {error}
              </p>
            )}

            <span className="link">
              Not an account?{" "}
              <Link className="text__under" href="/register">
                Register
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
