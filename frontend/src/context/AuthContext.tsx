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

interface LoginResult {
  success: boolean;
  message?: string;
  data?: Estudiante;
}

interface AuthContextType {
  estudiante: Estudiante | null;
  login: (correo: string, password: string) => Promise<LoginResult>;
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

  const login = async (correo: string, password: string): Promise<LoginResult> => {
    try {
      const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, password }),
      });

      if (!resp.ok) {
        const errorData = await resp.json().catch(() => null);

        return {
          success: false,
          message: errorData?.message || "Credenciales incorrectas",
        };
      }

      const data = await resp.json();

      setEstudiante(data);
      localStorage.setItem("estudiante", JSON.stringify(data));

      return {
        success: true,
        data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "No se pudo conectar con el servidor",
      };
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

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}