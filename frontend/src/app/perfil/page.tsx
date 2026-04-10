"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import MobileMenu from "@/components/MobileMenu";
import PageHeader from "@/components/PageHeader";
import { FullPageSkeleton } from "@/components/LoadingSkeleton";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const actividades = [
  { fecha: "2026-04-08", descripcion: "Pago de servicio: Trámite de bachiller", tipo: "pago", icono: "pago" },
  { fecha: "2026-04-05", descripcion: "Inicio de sesión", tipo: "sesion", icono: "sesion" },
  { fecha: "2026-04-01", descripcion: "Pago de servicio: Derecho de sustentación", tipo: "pago", icono: "pago" },
  { fecha: "2026-03-28", descripcion: "Actualización de perfil", tipo: "perfil", icono: "perfil" },
  { fecha: "2026-03-15", descripcion: "Solicitud de certificado de estudios", tipo: "solicitud", icono: "solicitud" },
];

export default function PerfilPage() {
  const router = useRouter();
  const { estudiante, loading: authLoading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!authLoading && !estudiante) {
      router.push("/login");
    }
  }, [authLoading, estudiante, router]);

  if (authLoading || !estudiante) {
    return <FullPageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <main className="lg:ml-[280px] min-h-screen">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-lg font-bold text-gray-900">Mi Perfil</h1>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-6 lg:p-8">
          <PageHeader 
            title="Mi Perfil" 
            subtitle="Gestiona tu información personal"
            actions={
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#6802c1] hover:bg-[#5802a1] text-white font-semibold rounded-xl transition-colors shadow-lg shadow-[#6802c1]/20"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                {isEditing ? "Cancelar" : "Editar"}
              </button>
            }
          />

          {/* Profile Header Card */}
          <div className="bg-white rounded-2xl shadow-card overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-[#6802c1] to-[#7B2CBF] p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center text-[#6802c1] font-bold text-3xl shadow-xl">
                    {estudiante.nombre.charAt(0).toUpperCase()}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-2xl font-bold text-white mb-1">{estudiante.nombre}</h2>
                  <p className="text-white/80">{estudiante.carrera}</p>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-white text-sm font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                      </svg>
                      {estudiante.codigo_universitario || `UC-${estudiante.id.toString().padStart(4, '0')}`}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/20 rounded-full text-green-200 text-sm font-medium">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      Activo
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Data */}
          <div className="bg-white rounded-2xl shadow-card overflow-hidden mb-8">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#6802c1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Datos Personales
              </h3>
              {isEditing && (
                <span className="text-xs text-[#6802c1] font-medium">Modo edición activo</span>
              )}
            </div>
            <div className="p-5 lg:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="p-4 bg-gray-50 rounded-xl">
                <label className="text-xs text-gray-500 font-medium mb-1 block">Nombre completo</label>
                <p className="font-semibold text-gray-900">{estudiante.nombre}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <label className="text-xs text-gray-500 font-medium mb-1 block">DNI</label>
                <p className="font-semibold text-gray-900">{estudiante.dni}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <label className="text-xs text-gray-500 font-medium mb-1 block">Correo electrónico</label>
                <p className="font-semibold text-gray-900 text-sm">{estudiante.correo}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <label className="text-xs text-gray-500 font-medium mb-1 block">Código universitario</label>
                <p className="font-semibold text-gray-900">{estudiante.codigo_universitario || `UC-${estudiante.id.toString().padStart(4, '0')}`}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <label className="text-xs text-gray-500 font-medium mb-1 block">Carrera profesional</label>
                <p className="font-semibold text-gray-900">{estudiante.carrera}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <label className="text-xs text-gray-500 font-medium mb-1 block">Facultad</label>
                <p className="font-semibold text-gray-900">{estudiante.facultad}</p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-card overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#6802c1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Actividad Reciente
              </h3>
            </div>
            <div className="p-5 lg:p-6">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-[15px] sm:left-1/2 top-0 bottom-0 w-px bg-gray-100 -translate-x-1/2" />
                
                <div className="space-y-6">
                  {actividades.map((actividad, i) => (
                    <div key={i} className="relative flex items-start gap-4 sm:gap-0">
                      {/* Icon */}
                      <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        actividad.tipo === "pago" ? "bg-green-100 text-green-600" :
                        actividad.tipo === "sesion" ? "bg-blue-100 text-blue-600" :
                        actividad.tipo === "perfil" ? "bg-purple-100 text-purple-600" :
                        "bg-[#6802c1]/10 text-[#6802c1]"
                      }`}>
                        {actividad.tipo === "pago" && (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                        )}
                        {actividad.tipo === "sesion" && (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                          </svg>
                        )}
                        {actividad.tipo === "perfil" && (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                        {actividad.tipo === "solicitud" && (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 sm:grid sm:grid-cols-2 sm:gap-4 sm:pl-10">
                        <div className="bg-gray-50 rounded-xl p-4">
                          <p className="text-sm font-medium text-gray-900">{actividad.descripcion}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(actividad.fecha).toLocaleDateString("es-PE", {
                              weekday: "long",
                              day: "numeric",
                              month: "long",
                              year: "numeric"
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
