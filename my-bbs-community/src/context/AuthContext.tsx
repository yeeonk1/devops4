import React, { createContext, useContext, useEffect, useState } from "react";
import { memberApi } from "../api/communityApi";

interface AuthContextType {
  userId: string | null;
  isLogin: boolean;
  loading: boolean;
  updateStatus: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const updateStatus = async () => {
    try {
      const res = await memberApi.status();
      setUserId(res.data.isLogin ? res.data.userId || null : null);
    } catch (error) {
      setUserId(null);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updateStatus();
  }, []);

  const logout = async () => {
    await memberApi.logout();
    setUserId(null);
  };

  return <AuthContext.Provider value={}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth error");
  }

  return context;
};
