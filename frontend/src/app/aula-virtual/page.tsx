"use client";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import MobileMenu from "@/components/MobileMenu";
import PageHeader from "@/components/PageHeader";

const cursosMock = [
  { id: 1, nombre: "Metodología de Investigación Científica", docente: "Dr. Roberto Mendoza", progreso: 75, sesiones: 12, sesionesCompletadas: 9, estado: "En curso", color: "from-[#6802c1] to-[#7B2CBF]" },
  { id: 2, nombre: "Redacción Científica y Publicación", docente: "Dra. María Fernández", progreso: 45, sesiones: 8, sesionesCompletadas: 4, estado: "En curso", color: "from-blue-500 to-indigo-600" },
  { id: 3, nombre: "Ética Profesional en Ingeniería", docente: "Mg. Carlos Ramírez", progreso: 100, sesiones: 6, sesionesCompletadas: 6, estado: "Completado", color: "from-green-500 to-emerald-600" },
  { id: 4, nombre: "Gestión de Proyectos de Software", docente: "Ing. Patricia Sánchez", progreso: 20, sesiones: 10, sesionesCompletadas: 2, estado: "En curso", color: "from-orange-500 to-amber-600" },
];

export default function AulaVirtual() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              <h1 className="text-lg font-bold text-gray-900">Aula Virtual</h1>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-6 lg:p-8">
          <PageHeader 
            title="Aula Virtual" 
            subtitle="Plataforma de aprendizaje en línea"
            badge={{ text: `${cursosMock.length} cursos`, variant: "primary" }}
          />

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cursosMock.map((curso) => (
              <div 
                key={curso.id}
                className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all cursor-pointer group"
              >
                {/* Course Header */}
                <div className={`p-6 bg-gradient-to-r ${curso.color} text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      curso.estado === "Completado"
                        ? "bg-white/20 text-white"
                        : "bg-white/20 text-white"
                    }`}>
                      {curso.estado}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-1">{curso.nombre}</h3>
                  <p className="text-white/80 text-sm">{curso.docente}</p>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-500">Progreso del curso</span>
                      <span className="font-semibold text-gray-900">{curso.progreso}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`h-full rounded-full bg-gradient-to-r ${curso.color} transition-all duration-500`}
                        style={{ width: `${curso.progreso}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{curso.sesionesCompletadas}/{curso.sesiones} sesiones</span>
                    </div>
                    <button className="inline-flex items-center gap-1 text-[#6802c1] font-semibold text-sm group-hover:gap-2 transition-all">
                      {curso.progreso === 100 ? "Revisar" : "Continuar"}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Links */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#6802c1]/10 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#6802c1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Biblioteca Virtual</h4>
                  <p className="text-sm text-gray-500">Accede a recursos</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#FFC20E]/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#E6AE0C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Foro de Discusión</h4>
                  <p className="text-sm text-gray-500">3 mensajes nuevos</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Tareas Pendientes</h4>
                  <p className="text-sm text-gray-500">2 entregas próximas</p>
                </div>
              </div>
            </div>
          </div>

          {/* Back Link */}
          <div className="text-center mt-8">
            <Link 
              href="/portal" 
              className="inline-flex items-center gap-2 text-[#6802c1] font-semibold hover:gap-3 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver al Portal
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
