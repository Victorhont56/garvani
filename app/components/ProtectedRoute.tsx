// components/ProtectedRoute.tsx
"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    router.push("/login");
    return null;
  }
  return <>{children}</>;
};

export default ProtectedRoute;