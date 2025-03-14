// components/ProtectedRoute.tsx
"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";
import { useEffect } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      // Redirect to login page if user is not authenticated
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner while checking auth status
  }

  if (!user) {
    return null; // Don't render anything if user is not authenticated
  }

  return <>{children}</>;
};

export default ProtectedRoute;