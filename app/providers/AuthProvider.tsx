"use client";

import { ReactNode } from "react";
import useAuthSync from "../hooks/useAuthSync";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  useAuthSync();

  return <>{children}</>;
};

export default AuthProvider;
