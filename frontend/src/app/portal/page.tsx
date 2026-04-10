"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import MobileMenu from "@/components/MobileMenu";
import PageHeader from "@/components/PageHeader";
import { FullPageSkeleton } from "@/components/LoadingSkeleton";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface Pago {
  id: number;
  fecha: string;
  monto_total?: number;
  monto?: number;
  estado: string;
  detalles: { servicio?: { nombre: string }; nombre?: string; precio: number }[];
}

export default function PortalPage() {
  const router = useRouter();
  const { estudiante, loading: authLoading } = useAuth();
  const [pagos, setPagos] = useState<Pago[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!authLoading && !estudiante) {
      router.push("/login");
      return;
    }
    if (estudiante) {
      fetch(`http://localhost:3001/api/estudiantes/${estudiante.id}/pagos`)
        .then((r) => r.json())
        .then((data) => {
          setPagos(data || []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [estudiante, authLoading, router]);

  const serviciosCompletados = pagos.reduce(
    (acc, pago) => acc + (pago.detalles?.length || 0),
    0
  );

  const totalPagado = pagos.reduce((acc, pago) => acc + (pago.monto_total || pago.monto || 0), 0);

  if (authLoading || !estudiante) {
    return <FullPageSkeleton />;
  }

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
              <h1 className="text-lg font-bold text-gray-900">Portal</h1>
            </div>
            <div className="w-8 h-8 bg-gradient-to-br from-[#6802C1] to-[#FFC20E] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
              {estudiante.nombre.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <div className="p-4 md:p-6 lg:p-8">
          <PageHeader 
            title="Portal del Estudiante" 
            subtitle={`Bienvenido, ${estudiante.nombre}`}
            badge={{ text: "Activo", variant: "success" }}
          />

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {/* Código */}
            <div className="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-50 rounded-bl-full" />
              <div className="relative">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <p className="text-sm text-gray-500 font-medium mb-1">Código</p>
                <p className="text-xl font-bold text-gray-900">
                  {estudiante.codigo_universitario || `UC-${estudiante.id.toString().padStart(4, '0')}`}
                </p>
              </div>
            </div>

            {/* Servicios */}
            <div className="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-100 to-green-50 rounded-bl-full" />
              <div className="relative">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-500 font-medium mb-1">Servicios</p>
                <p className="text-3xl font-bold text-green-600">{serviciosCompletados}</p>
              </div>
            </div>

            {/* Total Pagado */}
            <div className="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-bl-full" />
              <div className="relative">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-500 font-medium mb-1">Total Pagado</p>
                <p className="text-2xl font-bold text-yellow-600">S/ {totalPagado.toFixed(2)}</p>
              </div>
            </div>

            {/* Facultad */}
            <div className="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-50 rounded-bl-full" />
              <div className="relative">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <p className="text-sm text-gray-500 font-medium mb-1">Facultad</p>
                <p className="text-lg font-bold text-gray-900 truncate">{estudiante.facultad}</p>
              </div>
            </div>
          </div>

          {/* Personal Data Card */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-8">
            <div className="px-6 py-5 bg-gradient-to-r from-[#6802C1] to-[#7B2CBF]">
              <h2 className="font-bold text-white flex items-center gap-2 text-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Datos Personales
              </h2>
            </div>
            <div className="p-6 lg:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-[#6802C1]">
                <p className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wide">Nombre completo</p>
                <p className="font-semibold text-gray-900">{estudiante.nombre}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-[#6802C1]">
                <p className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wide">DNI</p>
                <p className="font-semibold text-gray-900">{estudiante.dni}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-[#6802C1]">
                <p className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wide">Correo electrónico</p>
                <p className="font-semibold text-gray-900 text-sm truncate">{estudiante.correo}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-[#FFC20E]">
                <p className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wide">Carrera profesional</p>
                <p className="font-semibold text-gray-900">{estudiante.carrera}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-[#FFC20E]">
                <p className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wide">Código universitario</p>
                <p className="font-semibold text-gray-900">{estudiante.codigo_universitario || `UC-${estudiante.id.toString().padStart(4, '0')}`}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl border-l-4 border-green-500">
                <p className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wide">Estado</p>
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-500 text-white text-sm font-semibold rounded-full">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  Activo
                </span>
              </div>
            </div>
          </div>

          {/* Payment History Card */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="font-bold text-gray-900 flex items-center gap-2 text-lg">
                <svg className="w-5 h-5 text-[#6802C1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                Historial de Pagos
              </h2>
              <Link
                href="/catalogo"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#6802C1] to-[#7B2CBF] hover:from-[#5B1A96] hover:to-[#6802C1] text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Solicitar servicio
              </Link>
            </div>
            <div className="p-6 lg:p-8">
              {loading ? (
                <div className="text-center py-12">
                  <div className="w-14 h-14 border-4 border-[#6802C1] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-gray-500">Cargando historial...</p>
                </div>
              ) : pagos.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-lg mb-2">No tienes pagos registrados</p>
                  <p className="text-gray-400 text-sm mb-6">Solicita un servicio para comenzar</p>
                  <Link
                    href="/catalogo"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FFC20E] to-[#EAB308] text-[#1F2937] font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    Ver servicios disponibles
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto -mx-6 lg:-mx-8 px-6 lg:px-8">
                  <table className="w-full min-w-[500px]">
                    <thead>
                      <tr className="text-left border-b-2 border-gray-100">
                        <th className="pb-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Fecha</th>
                        <th className="pb-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Servicios</th>
                        <th className="pb-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Monto</th>
                        <th className="pb-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {pagos.map((pago) => (
                        <tr key={pago.id} className="hover:bg-purple-50/30 transition-colors">
                          <td className="py-4 text-sm text-gray-600">
                            {pago.fecha ? new Date(pago.fecha).toLocaleDateString("es-PE", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric"
                            }) : "-"}
                          </td>
                          <td className="py-4">
                            <p className="text-sm font-medium text-gray-900">
                              {pago.detalles?.map((d) => d.servicio?.nombre || d.nombre).join(", ") || "-"}
                            </p>
                          </td>
                          <td className="py-4">
                            <span className="font-bold text-[#6802C1]">
                              S/ {(pago.monto_total || pago.monto || 0).toFixed(2)}
                            </span>
                          </td>
                          <td className="py-4">
                            <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-xs px-3 py-1.5 rounded-full font-semibold">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {pago.estado || "Completado"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
