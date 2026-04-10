"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import MobileMenu from "@/components/MobileMenu";
import PageHeader from "@/components/PageHeader";

const stats = [
  { 
    label: "Cursos Activos", 
    value: "5",
    subtext: "del ciclo actual",
    gradient: "from-violet-500 to-purple-600",
    bgGradient: "bg-gradient-to-br from-violet-50 to-purple-50",
    icon: "📚"
  },
  { 
    label: "Créditos Totales", 
    value: "48",
    subtext: "créditos acumulados",
    gradient: "from-emerald-500 to-green-600",
    bgGradient: "bg-gradient-to-br from-emerald-50 to-green-50",
    icon: "🎓"
  },
  { 
    label: "Asistencias", 
    value: "92%",
    subtext: "promedio general",
    gradient: "from-blue-500 to-cyan-600",
    bgGradient: "bg-gradient-to-br from-blue-50 to-cyan-50",
    icon: "✅"
  },
  { 
    label: "Promedio", 
    value: "16.5",
    subtext: "nota promedio",
    gradient: "from-amber-500 to-yellow-600",
    bgGradient: "bg-gradient-to-br from-amber-50 to-yellow-50",
    icon: "⭐"
  },
];

const cursosRecientes = [
  { id: 1, nombre: "Metodología de Investigación", docente: "Dr. Roberto Mendoza", progreso: 75, color: "from-violet-500 to-purple-600", bgColor: "bg-violet-100", textColor: "text-violet-600" },
  { id: 2, nombre: "Redacción Científica", docente: "Dra. María Fernández", progreso: 45, color: "from-blue-500 to-cyan-600", bgColor: "bg-blue-100", textColor: "text-blue-600" },
  { id: 3, nombre: "Ética Profesional", docente: "Mg. Carlos Ramírez", progreso: 100, color: "from-emerald-500 to-green-600", bgColor: "bg-emerald-100", textColor: "text-emerald-600" },
  { id: 4, nombre: "Gestión de Proyectos", docente: "Ing. Patricia Sánchez", progreso: 20, color: "from-orange-500 to-amber-600", bgColor: "bg-orange-100", textColor: "text-orange-600" },
];

export default function Dashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
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
              <h1 className="text-lg font-bold text-gray-900">Dashboard</h1>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-6 lg:p-8">
          <PageHeader 
            title="Dashboard" 
            subtitle="Bienvenido de vuelta"
            badge={{ text: "Ciclo 2026-I", variant: "info" }}
          />

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {stats.map((stat, i) => (
              <div 
                key={i} 
                className={`${stat.bgGradient} rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer`}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{stat.icon}</span>
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
                </div>
                <p className="text-3xl lg:text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1">
                  {stat.value}
                </p>
                <p className="text-sm font-semibold text-gray-700">{stat.label}</p>
                <p className="text-xs text-gray-500">{stat.subtext}</p>
              </div>
            ))}
          </div>

          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-[#6802C1] via-[#7B2CBF] to-[#9333EA] rounded-2xl p-6 mb-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-[#FFC20E]/20 rounded-full translate-y-1/2" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">¡Hola, Giovany! 👋</h3>
              <p className="text-white/80 mb-4">Tienes 3 tareas pendientes esta semana. ¡Sigue así!</p>
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 bg-white text-[#6802C1] font-semibold rounded-xl hover:bg-white/90 transition-colors shadow-lg">
                  Ver tareas
                </button>
                <button className="px-4 py-2 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-colors backdrop-blur-sm">
                  Recursos
                </button>
              </div>
            </div>
          </div>

          {/* Courses Card */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-gray-900 flex items-center gap-2 text-lg">
                <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </span>
                Cursos del Ciclo
              </h2>
              <span className="text-sm text-gray-500">5 cursos activos</span>
            </div>
            <div className="divide-y divide-gray-50">
              {cursosRecientes.map((curso) => (
                <div key={curso.id} className="p-4 lg:p-5 hover:bg-gray-50/50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 ${curso.bgColor} rounded-xl flex items-center justify-center`}>
                        <svg className={`w-6 h-6 ${curso.textColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-0.5">{curso.nombre}</p>
                        <p className="text-sm text-gray-500">{curso.docente}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <div className="flex-1 sm:flex-initial w-full sm:w-40 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                        <div 
                          className={`h-full rounded-full bg-gradient-to-r ${curso.color} transition-all duration-500`}
                          style={{ width: `${curso.progreso}%` }}
                        />
                      </div>
                      <span className={`text-sm font-bold ${curso.textColor} w-12 text-right`}>
                        {curso.progreso}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <button className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition-all text-left group">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="font-semibold text-gray-900">Tareas</p>
              <p className="text-sm text-gray-500">3 pendientes</p>
            </button>

            <button className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition-all text-left group">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="font-semibold text-gray-900">Horario</p>
              <p className="text-sm text-gray-500">Ver semanal</p>
            </button>

            <button className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition-all text-left group">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="font-semibold text-gray-900">Clases</p>
              <p className="text-sm text-gray-500">2 virtuales</p>
            </button>

            <button className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition-all text-left group">
              <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="font-semibold text-gray-900">Pagos</p>
              <p className="text-sm text-gray-500">Pendiente</p>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
