"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function TopLoadingBar() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Когда pathname меняется — показываем загрузку коротко
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000); // задержка для имитации загрузки

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <div className={`top-loading-bar ${loading ? "active" : ""}`}></div>
  );
}
