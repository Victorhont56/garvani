"use client";

import { usePathname } from "next/navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // ✅ Get current path
  const isHomePage = pathname === "/";

  return <>{isHomePage && children}</>;
}
