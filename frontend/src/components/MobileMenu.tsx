"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { ReactNode } from "react";

const menuItems = [
  { 
    href: "/dashboard", 
    label: "Dashboard", 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    )
  },
  { 
    href: "/cursos", 
    label: "Cursos", 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  },
  { 
    href: "/docentes", 
    label: "Docentes", 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5V16a3 3 0 00-3-3h-2M9 20H4a2 2 0 01-2-2v-2a3 3 0 013-3h8a3 3 0 013 3v2a2 2 0 01-2 2zM9 10a4 4 0 100-8 4 4 0 000 8zm15 0a3 3 0 100-6 3 3 0 000 6z" />
      </svg>
    )
  },
  { 
    href: "/horarios", 
    label: "Horarios", 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  { 
    href: "/portal", 
    label: "Portal Académico", 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    )
  },
  { 
    href: "/catalogo", 
    label: "Servicios Financieros", 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    )
  },
  { 
    href: "/aula-virtual", 
    label: "Aula Virtual", 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  { 
    href: "/perfil", 
    label: "Mi Perfil", 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
      </svg>
    )
  },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { estudiante, logout } = useAuth();
  
  if (!isOpen) return null;

  const isActive = (href: string) => pathname === href;

  const handleLogout = () => {
    logout();
    onClose();
    router.push("/login");
  };

  return (
    <div className="fixed inset-0 z-[100] lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#120227]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Sidebar Panel */}
      <div className="fixed inset-y-0 left-0 w-[280px] bg-gradient-to-br from-[#2D0B5A] via-[#1A0538] to-[#120227] flex flex-col shadow-2xl border-r border-[#6802C1]/30 transform transition-transform duration-300 ease-in-out">
        
        {/* Superior Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <Link href="/" onClick={onClose} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-[#FFC20E] to-[#FFF1C1] rounded-xl flex items-center justify-center p-1.5 shadow-lg shadow-[#FFC20E]/20">
              <Image src="/logocontinental.png" alt="UC" width={30} height={30} className="object-contain" />
            </div>
            <div>
              <p className="text-[9px] font-bold text-[#FFC20E] tracking-[0.2em] uppercase">Universidad</p>
              <p className="text-sm font-black text-white tracking-tight">Continental</p>
            </div>
          </Link>
          <button 
            onClick={onClose}
            className="p-2 -mr-2 text-white/50 hover:text-white hover:bg-white/10 rounded-xl transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* User Info Resumen */}
        {estudiante && (
          <div className="p-5 border-b border-white/5 bg-white/5">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img src="/usuario.jpg" alt={estudiante.nombre} className="w-14 h-14 rounded-full object-cover border-2 border-white/20 shadow-xl" onError={(e) => { e.currentTarget.style.display='none'; }} />
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-[#1A0538] rounded-full"></div>
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <p className="font-bold text-white text-base leading-tight truncate">{estudiante.nombre.split(' ').slice(0, 2).join(' ')}</p>
                <p className="text-[11px] text-[#FFC20E] font-medium truncate mt-0.5">{estudiante.carrera}</p>
                <div className="flex items-center gap-1.5 mt-1 opacity-80">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-[10px] text-white uppercase tracking-wider">En línea</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Principal */}
        <nav className="flex-1 px-4 py-4 overflow-y-auto custom-scrollbar space-y-1">
          <p className="px-4 text-[11px] font-bold text-white/40 uppercase tracking-widest mb-3 mt-2">Menú de Navegación</p>
          
          {menuItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`group flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 relative ${
                  active
                    ? "bg-gradient-to-r from-[#6802C1]/80 to-[#6802C1]/20 text-white shadow-lg border border-[#6802C1]/50"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                {active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-[#FFC20E] rounded-r-md shadow-[0_0_10px_rgba(255,194,14,0.5)]" />
                )}
                
                <div className={`transition-transform duration-300 ${active ? 'scale-110 text-[#FFC20E]' : 'group-hover:scale-110 group-hover:text-white'}`}>
                  {item.icon}
                </div>
                
                <span className="flex-1 tracking-wide">{item.label}</span>
                
                {active && (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FFC20E] shadow-[0_0_8px_rgba(255,194,14,0.8)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Area */}
        <div className="p-5 border-t border-white/10 bg-black/10">
          {estudiante ? (
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-white/5 hover:bg-red-500/10 text-white/70 hover:text-red-400 font-bold rounded-xl transition-all duration-300 border border-transparent hover:border-red-500/20 group"
            >
              <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Cerrar Sesión
            </button>
          ) : (
            <Link
              href="/login"
              onClick={onClose}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-[#FFC20E] to-[#EAB308] text-[#1A0538] font-bold rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-[#FFC20E]/20"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Acceder al Sistema
            </Link>
          )}
        </div>
        
      </div>
    </div>
  );
}
