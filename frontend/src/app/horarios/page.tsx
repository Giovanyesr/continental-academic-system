"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import MobileMenu from "@/components/MobileMenu";
import PageHeader from "@/components/PageHeader";

const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

const horariosData = [
  { curso: "Metodología de Investigación", docente: "Dr. Roberto Mendoza", dia: "Lunes", hora: "10:00 - 12:00", aula: "A-201", color: "bg-[#6802c1]" },
  { curso: "Metodología de Investigación", docente: "Dr. Roberto Mendoza", dia: "Miércoles", hora: "10:00 - 12:00", aula: "A-201", color: "bg-[#6802c1]" },
  { curso: "Redacción Científica", docente: "Dra. María Fernández", dia: "Martes", hora: "15:00 - 17:00", aula: "B-105", color: "bg-blue-500" },
  { curso: "Redacción Científica", docente: "Dra. María Fernández", dia: "Jueves", hora: "15:00 - 17:00", aula: "B-105", color: "bg-blue-500" },
  { curso: "Gestión de Proyectos", docente: "Ing. Patricia Sánchez", dia: "Miércoles", hora: "09:00 - 11:00", aula: "C-302", color: "bg-orange-500" },
  { curso: "Gestión de Proyectos", docente: "Ing. Patricia Sánchez", dia: "Viernes", hora: "09:00 - 11:00", aula: "C-302", color: "bg-orange-500" },
];

export default function Horarios() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [vista, setVista] = useState<"semana" | "lista">("lista");

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
              <h1 className="text-lg font-bold text-gray-900">Horarios</h1>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-6 lg:p-8">
          <PageHeader 
            title="Horarios de Clases" 
            subtitle="Semana: 12 - 18 Abril 2026"
          />

          {/* View Toggle */}
          <div className="bg-white rounded-2xl p-2 shadow-card inline-flex mb-6">
            <button
              onClick={() => setVista("lista")}
              className={`px-5 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                vista === "lista"
                  ? "bg-[#6802c1] text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                Lista
              </span>
            </button>
            <button
              onClick={() => setVista("semana")}
              className={`px-5 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                vista === "semana"
                  ? "bg-[#6802c1] text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Semana
              </span>
            </button>
          </div>

          {vista === "lista" ? (
            <div className="bg-white rounded-2xl shadow-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px]">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Curso</th>
                      <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Docente</th>
                      <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Día</th>
                      <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Horario</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {horariosData.map((horario, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${horario.color}`} />
                            <span className="font-medium text-gray-900">{horario.curso}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 hidden sm:table-cell">
                          <span className="text-gray-600">{horario.docente}</span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-gray-600">{horario.dia}</span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-900">{horario.hora}</span>
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-lg text-xs font-semibold text-gray-600">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              </svg>
                              {horario.aula}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px]">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-20">Hora</th>
                      {diasSemana.map((dia) => (
                        <th key={dia} className="px-4 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          <span className="hidden sm:inline">{dia}</span>
                          <span className="sm:hidden">{dia.substring(0, 2)}.</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {["07:00", "08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "17:00"].map((hora) => (
                      <tr key={hora}>
                        <td className="px-4 py-3 text-sm font-medium text-gray-500">{hora}</td>
                        {diasSemana.map((dia) => {
                          const clase = horariosData.find(h => h.dia === dia && h.hora.includes(hora));
                          return (
                            <td key={dia} className="px-2 py-2 align-top h-16">
                              {clase && (
                                <div className={`${clase.color} bg-opacity-10 p-3 rounded-xl`}>
                                  <p className={`font-semibold text-sm ${clase.color.replace('bg-', 'text-')}`}>
                                    {clase.curso}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">{clase.aula}</p>
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
