import { useContext } from "react";
import { AuthContext } from "../contexts/auth-provider";

export function useAuth() {
  const value = useContext(AuthContext)
  if(!value) {
    throw new Error('useAuth must be using with Auth Provider.');
  }

  return value;
}