"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import MobileMenu from "@/components/MobileMenu";
import PageHeader from "@/components/PageHeader";

const docentesData = [
  { id: 1, nombre: "Dr. Roberto Mendoza", especialidad: "Metodología de Investigación", correo: "rmendoza@ucontinental.edu.pe", cursos: 3, avatar: "RM" },
  { id: 2, nombre: "Dra. María Fernández", especialidad: "Redacción Científica", correo: "mfernandez@ucontinental.edu.pe", cursos: 2, avatar: "MF" },
  { id: 3, nombre: "Mg. Carlos Ramírez", especialidad: "Ética Profesional", correo: "cramirez@ucontinental.edu.pe", cursos: 4, avatar: "CR" },
  { id: 4, nombre: "Ing. Patricia Sánchez", especialidad: "Gestión de Proyectos", correo: "psanchez@ucontinental.edu.pe", cursos: 3, avatar: "PS" },
];

export default function Docentes() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  const docentesFiltrados = docentesData.filter((docente) =>
    docente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    docente.especialidad.toLowerCase().includes(busqueda.toLowerCase())
  );

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
              <h1 className="text-lg font-bold text-gray-900">Docentes</h1>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-6 lg:p-8">
          <PageHeader 
            title="Directorio de Docentes" 
            subtitle="Conoce a tus profesores"
          />

          {/* Search */}
          <div className="bg-white rounded-2xl p-4 shadow-card mb-6">
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Buscar docente por nombre o especialidad..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-[#6802c1] focus:ring-4 focus:ring-[#6802c1]/10 outline-none transition-all"
              />
            </div>
          </div>

          {/* Teachers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {docentesFiltrados.map((docente) => (
              <div key={docente.id} className="bg-white rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all group">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#6802c1] to-[#7B2CBF] rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-[#6802c1]/20 group-hover:shadow-xl group-hover:shadow-[#6802c1]/30 transition-all">
                    {docente.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 mb-1">{docente.nombre}</h3>
                    <p className="text-sm text-[#6802c1] font-medium mb-2">{docente.especialidad}</p>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {docente.correo}
                      </span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#FFC20E]/20 rounded-xl flex flex-col items-center justify-center">
                      <span className="text-lg font-bold text-[#E6AE0C]">{docente.cursos}</span>
                      <span className="text-[10px] text-[#E6AE0C] font-medium">cursos</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {docentesFiltrados.length === 0 && (
            <div className="bg-white rounded-2xl p-12 text-center shadow-card">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-gray-500">No se encontraron docentes</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
