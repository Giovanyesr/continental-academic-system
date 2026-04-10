"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface Estudiante {
  id: number;
  dni: string;
  nombre: string;
  correo: string;
  codigo_universitario: string;
  carrera: string;
  facultad: string;
}

interface AuthContextType {
  estudiante: Estudiante | null;
  login: (correo: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getInitialEstudiante(): Estudiante | null {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("estudiante");
    return saved ? JSON.parse(saved) : null;
  }
  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [estudiante, setEstudiante] = useState<Estudiante | null>(getInitialEstudiante);
  const [loading] = useState(false);

  const login = async (correo: string, password: string): Promise<boolean> => {
    try {
      const resp = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, password }),
      });

      if (!resp.ok) return false;

      const data = await resp.json();
      setEstudiante(data);
      localStorage.setItem("estudiante", JSON.stringify(data));
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    setEstudiante(null);
    localStorage.removeItem("estudiante");
  };

  return (
    <AuthContext.Provider value={{ estudiante, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
