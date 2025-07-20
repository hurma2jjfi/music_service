"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import TopLoadingBar from "./TopLoadingBar";

export default function ClientRootWrapper({ children }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <>
      <TopLoadingBar loading={loading} />
      {children}
    </>
  );
}
