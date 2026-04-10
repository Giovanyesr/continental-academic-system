"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

interface Estudiante {
  id: number;
  dni: string;
  nombre: string;
  carrera: string;
  facultad: string;
  correo: string;
  codigo_universitario?: string;
}

interface HeaderProps {
  estudiante?: Estudiante | null;
}

export default function Header({ estudiante }: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isActive = (path: string) => pathname === path;

  const navItems = [
    { href: "/portal", label: "Portal" },
    { href: "/catalogo", label: "Servicios" },
    { href: "/aula-virtual", label: "Aula Virtual" },
  ];

  return (
    <>
      <header className="bg-[#6802c1] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                  <Image src="/logocontinental.png" alt="UC" width={40} height={40} className="object-contain" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-sm font-bold text-white">UNIVERSIDAD CONTINENTAL</h1>
                </div>
              </Link>

              <nav className="hidden md:flex items-center gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? "bg-white/20 text-white"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              {estudiante ? (
                <div className="hidden md:flex items-center gap-2 text-sm">
                  <span className="text-white/80">{estudiante.nombre}</span>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="bg-[#FFC20E] text-gray-900 font-semibold py-2 px-4 text-sm"
                >
                  Iniciar Sesión
                </Link>
              )}

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#6802c1] border-t border-white/10">
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2 text-sm font-medium ${
                    isActive(item.href) ? "bg-white/20 text-white" : "text-white/80"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
