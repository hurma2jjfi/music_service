"use client";

import { useState } from "react";
import Link from "next/link";
import { AiOutlineExclamationCircle } from "react-icons/ai"; // импорт иконки
import "../styles/Register.css";
import { ClipLoader } from "react-spinners";

export default function Register() {
  const [form, setForm] = useState({
    username: "",    // добавлено поле username
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Для треугольников - отслеживаем, были ли поля "затроганы" (blur)
  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  // Проверка ошибок для каждого поля
  const errors = {
    username: touched.username && !form.username.trim(),
    email: touched.email && !form.email.trim(),
    password: touched.password && !form.password,
    confirmPassword: touched.confirmPassword && form.confirmPassword !== form.password,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Проверяем, если есть ошибки, не отправляем
    if (!form.username || !form.email || !form.password || form.confirmPassword !== form.password) {
      setError("Пожалуйста, заполните все поля корректно");
      setTouched({
        username: true,
        email: true,
        password: true,
        confirmPassword: true,
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Ошибка при регистрации");
      } else {
        setSuccess("Регистрация прошла успешно! Можете войти.");
        setForm({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setTouched({
          username: false,
          email: false,
          password: false,
          confirmPassword: false,
        });
      }
    } catch (err) {
      setError("Ошибка сети или сервера");
    } finally {
      setLoading(false);
    }
  };

  // CSS класс для ошибок
  const inputErrorClass = (hasError) => hasError ? "input-error" : "";

  return (
    <div className="login__roditel">
      <div className="login__wrapper">
        <div className="logo">
          <img src="/favicon.ico" alt="Логотип сайта" width={32} height={32} />
        </div>
        <h1 className="title">Create a Potify Account</h1>

        <div className="container">
          <div className="wrapper">
            <form onSubmit={handleSubmit} noValidate>
              {/* Username */}
              <div className="first-col" style={{ position: "relative" }}>
                <label htmlFor="username">Username*:</label>
                <input
                  className={inputErrorClass(errors.username)}
                  type="text"
                  name="username"
                  id="username"
                  value={form.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {errors.username && (
                  <AiOutlineExclamationCircle 
                    color="red" 
                    size={20} 
                    style={{ position: "absolute", right: 10, top: 54 }} 
                    title="Обязательное поле"
                  />
                )}
              </div>

              {/* Email */}
              <div className="first-col" style={{ position: "relative" }}>
                <label htmlFor="email">Email*:</label>
                <input
                  className={`email ${inputErrorClass(errors.email)}`}
                  type="email"
                  name="email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {errors.email && (
                  <AiOutlineExclamationCircle 
                    color="red" 
                    size={20} 
                    style={{ position: "absolute", right: 10, top: 54 }} 
                    title="Обязательное поле"
                  />
                )}
              </div>

              {/* Password */}
              <div className="two-col" style={{ position: "relative" }}>
                <label htmlFor="password">Password*:</label>
                <input
                  className={inputErrorClass(errors.password)}
                  type="password"
                  name="password"
                  id="password"
                  value={form.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {errors.password && (
                  <AiOutlineExclamationCircle 
                    color="red" 
                    size={20} 
                    style={{ position: "absolute", right: 10, top: 54 }} 
                    title="Обязательное поле"
                  />
                )}
              </div>

              {/* Confirm Password */}
              <div className="two-col" style={{ position: "relative" }}>
                <label htmlFor="confirmPassword">Confirm Password*:</label>
                <input
                  className={inputErrorClass(errors.confirmPassword)}
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {errors.confirmPassword && (
                  <AiOutlineExclamationCircle 
                    color="red" 
                    size={20} 
                    style={{ position: "absolute", right: 10, top: 54 }} 
                    title="Пароли не совпадают"
                  />
                )}
              </div>

              <button
                className="login"
                type="submit"
                disabled={loading}
              >
                 {loading ? (
                  <ClipLoader size={20} color="#ffffff" />
                ) : (
                  "Register"
                )}
              </button>

              {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
              {success && <p style={{ color: "green", marginTop: "1rem" }}>{success}</p>}

              <span className="link" style={{ marginTop: "1rem" }}>
                Already have an account?{" "}
                <Link className="text__under" href="/login">
                  Sign In
                </Link>
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
