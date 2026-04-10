"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import MobileMenu from "@/components/MobileMenu";
import PageHeader from "@/components/PageHeader";

const cursosData = [
  { id: 1, nombre: "Metodología de Investigación Científica", codigo: "INV401", docente: "Dr. Roberto Mendoza", creditos: 4, estado: "En curso", progreso: 75 },
  { id: 2, nombre: "Redacción Científica y Publicación", codigo: "INV402", docente: "Dra. María Fernández", creditos: 3, estado: "En curso", progreso: 45 },
  { id: 3, nombre: "Ética Profesional en Ingeniería", codigo: "ETH301", docente: "Mg. Carlos Ramírez", creditos: 3, estado: "Completado", progreso: 100 },
  { id: 4, nombre: "Gestión de Proyectos de Software", codigo: "GPR402", docente: "Ing. Patricia Sánchez", creditos: 4, estado: "En curso", progreso: 20 },
];

export default function Cursos() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  const cursosFiltrados = cursosData.filter((curso) =>
    curso.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    curso.codigo.toLowerCase().includes(busqueda.toLowerCase())
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
              <h1 className="text-lg font-bold text-gray-900">Cursos</h1>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-6 lg:p-8">
          <PageHeader 
            title="Gestión de Cursos" 
            subtitle="Administra los cursos del ciclo académico"
          />

          {/* Search */}
          <div className="bg-white rounded-2xl p-4 shadow-card mb-6">
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Buscar curso por nombre o código..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-[#6802c1] focus:ring-4 focus:ring-[#6802c1]/10 outline-none transition-all"
              />
            </div>
          </div>

          {/* Courses Table */}
          <div className="bg-white rounded-2xl shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Código</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Nombre</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Docente</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Cred</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Estado</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Progreso</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {cursosFiltrados.map((curso) => (
                    <tr key={curso.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4">
                        <span className="font-mono font-semibold text-[#6802c1]">{curso.codigo}</span>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-medium text-gray-900">{curso.nombre}</p>
                      </td>
                      <td className="px-5 py-4 hidden sm:table-cell">
                        <p className="text-gray-600">{curso.docente}</p>
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-[#6802c1]/10 rounded-lg font-bold text-[#6802c1]">
                          {curso.creditos}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-semibold ${
                          curso.estado === "Completado"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {curso.estado === "Completado" && (
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                          {curso.estado}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-20 md:w-28 bg-gray-100 rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                curso.progreso === 100 ? "bg-green-500" : "bg-[#6802c1]"
                              }`}
                              style={{ width: `${curso.progreso}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-gray-600 w-10">{curso.progreso}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
