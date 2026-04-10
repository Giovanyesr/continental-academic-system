"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import MobileMenu from "@/components/MobileMenu";
import PageHeader from "@/components/PageHeader";
import { FullPageSkeleton } from "@/components/LoadingSkeleton";
import { useAuth } from "@/context/AuthContext";
import Toast from "@/components/Toast";

interface Estudiante {
  id: number;
  dni: string;
  nombre: string;
  carrera: string;
  facultad: string;
  correo: string;
}

interface Servicio {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  fase: number;
}

const FASE_NAMES: Record<number, string> = {
  1: "Desarrollo de Tesis",
  2: "Sustentación",
  3: "Bachiller y Titulación",
  4: "Carné Universitario",
  5: "Certificados y Constancias",
  6: "Biblioteca",
  7: "Deportes y Recreación",
  8: "Bienestar y Servicios",
  9: "Pensiones",
};

const FASE_ICONS: Record<number, React.ReactNode> = {
  1: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72l5 2.73 5-2.73v3.72z"/></svg>,
  2: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/><path d="M7 12h2v5H7zm4-3h2v8h-2zm4-3h2v11h-2z"/></svg>,
  3: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>,
  4: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M21 3H3c-1.11 0-2 .89-2 2v14c0 1.11.89 2 2 2h18c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm-9 15H4v-2h8v2zm0-4H4v-2h8v2zm7 0h-4v-6h4v6z"/></svg>,
  5: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>,
  6: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zM21 18.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/></svg>,
  7: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.2 11.4c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3V2H6.8v2h-3C2.7 4 1.8 4.9 1.8 6v3.4c0 1.1.9 2 2 2h3.2v.3c0 2.5 1.8 4.5 4 4.9v2.2H8.8v2h6.4v-2h-2.2v-2.2c2.2-.4 4-2.4 4-4.9v-.3h3.2zm-14.4-6h2V9H5.8V5.4zm12.4 3.6h-2V5.4h2V9z"/></svg>,
  8: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>,
  9: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>,
};

const FASES = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const BANCOS = [
  { id: "Caja Huancayo", nombre: "Caja Huancayo", color: "#D1103A", iniciales: "CH" },
  { id: "Caja Centro", nombre: "Caja Centro", color: "#06509D", iniciales: "CC" },
  { id: "Banco Nación", nombre: "Banco de la Nación", color: "#E3000F", iniciales: "BN" },
  { id: "BCP", nombre: "Banco de Crédito del Perú", color: "#003D82", iniciales: "BCP" },
  { id: "BBVA", nombre: "BBVA Continental", color: "#005E39", iniciales: "BBVA" },
  { id: "Interbank", nombre: "Interbank", color: "#003DA5", iniciales: "IBK" },
];

export default function CatalogoServicios() {
  const router = useRouter();
  const { estudiante: authEstudiante, loading: authLoading } = useAuth();
  const [estudiante, setEstudiante] = useState<Estudiante | null>(null);
  const [catalogo, setCatalogo] = useState<Record<number, Servicio[]>>({});
  const [catalogoError, setCatalogoError] = useState<string | null>(null);
  const [pagosHistorico, setPagosHistorico] = useState<number[]>([]);
  const [carrito, setCarrito] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [banco, setBanco] = useState("");
  const [procesando, setProcesando] = useState(false);
  const [exito, setExito] = useState(false);
  const [tipoPago, setTipoPago] = useState<"TARJETA" | "DNI">("TARJETA");
  const [dniPagador, setDniPagador] = useState("");
  const [dniNombre, setDniNombre] = useState("");
  const [dniBuscando, setDniBuscando] = useState(false);
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [provinciaPagador, setProvinciaPagador] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedFase, setExpandedFase] = useState<number | null>(1);

  const buscarDNI = async (dni: string) => {
    if (dni.length !== 8) return;
    setDniBuscando(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dni/${dni}`);
      const data = await res.json();
      if (data.success) {
        setDniNombre(data.nombreCompleto);
      } else {
        setDniNombre("");
      }
    } catch {
      setDniNombre("");
    }
    setDniBuscando(false);
  };

  useEffect(() => {
    if (!authLoading && !authEstudiante) {
      router.push("/login");
      return;
    }
    if (authEstudiante) {
      setEstudiante(authEstudiante as Estudiante);
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/estudiantes/${authEstudiante.id}/pagos`)
        .then(r => r.json())
        .then((data: { detalles: { servicio_id: number }[] }[]) => {
          if (!Array.isArray(data)) {
            return;
          }
          const paidIds: number[] = [];
          data.forEach((p) => p.detalles?.forEach((d) => paidIds.push(d.servicio_id)));
          setPagosHistorico(paidIds);
        })
        .catch((e) => console.error("Error obteniendo pagos:", e));
    }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/servicios`)
      .then(r => r.json())
      .then(data => {
        console.log("Servicios cargados:", data);
        setCatalogo(data.catalogo || {});
        setCatalogoError(null);
      })
      .catch(e => {
        console.error("Error cargando servicios:", e);
        setCatalogoError("No se pudo conectar al servidor. URL: " + process.env.NEXT_PUBLIC_API_URL);
      });
  }, [authLoading, authEstudiante]);

  const allServicios = useMemo(() => Object.values(catalogo).flat(), [catalogo]);

  const totalCarrito = useMemo(() => {
    return carrito.reduce((total, id) => {
      const serv = allServicios.find(s => s.id === id);
      return total + (serv?.precio || 0);
    }, 0);
  }, [carrito, allServicios]);

  const handleToggle = (servicio: Servicio) => {
    const isChecked = carrito.includes(servicio.id);
    if (!isChecked) {
      setCarrito([...carrito, servicio.id]);
      setToast({ message: `${servicio.nombre} agregado`, type: "success" });
    } else {
      setCarrito(carrito.filter(id => id !== servicio.id));
    }
  };

  const procesarPago = async (e: React.FormEvent) => {
    e.preventDefault();
    if (carrito.length === 0) return;
    if (!banco) {
      setToast({ message: "Seleccione un banco", type: "error" });
      return;
    }
    setProcesando(true);
    try {
      const body: Record<string, string | number | string[] | number[]> = {
        estudiante_id: estudiante?.id as number,
        monto_total: totalCarrito,
        metodo_pago: tipoPago === "TARJETA" ? "Tarjeta" : "DNI",
        banco,
        servicios_ids: carrito,
        tipo_pago: tipoPago
      };

      if (tipoPago === "DNI") {
        body.dni_pagador = dniPagador;
        body.fecha_nacimiento = fechaNacimiento;
        body.provincia_pagador = provinciaPagador;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pagos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (!res.ok) {
        setToast({ message: data.error || "Error al procesar", type: "error" });
        setProcesando(false);
        return;
      }

      setExito(true);
      setToast({ message: "¡Pago procesado exitosamente!", type: "success" });
      setTimeout(() => {
        setPagosHistorico([...pagosHistorico, ...carrito]);
        setCarrito([]);
        setShowModal(false);
        setExito(false);
      }, 3000);
    } catch {
      setToast({ message: "Error de conexión", type: "error" });
    }
    finally { setProcesando(false); }
  };

  const resetModal = () => {
    setShowModal(false);
    setBanco("");
    setTipoPago("TARJETA");
    setDniPagador("");
    setFechaNacimiento("");
    setProvinciaPagador("");
  };

  if (authLoading) {
    return <FullPageSkeleton />;
  }

  if (!estudiante) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-card text-center max-w-md w-full">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Acceso Restringido</h2>
          <p className="text-gray-500 mb-6">Debes iniciar sesión para ver los servicios</p>
          <Link href="/login" className="inline-block bg-[#6802c1] text-white py-3 px-6 rounded-xl font-semibold hover:bg-[#5802a1] transition-colors">
            Iniciar Sesión
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <main className="lg:ml-[280px] min-h-screen">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <button onClick={() => setMobileMenuOpen(true)} className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-lg font-bold text-gray-900">Servicios</h1>
            </div>
            {carrito.length > 0 && (
              <span className="px-3 py-1 bg-[#FFC20E] text-gray-900 text-sm font-bold rounded-full">
                {carrito.length} en carrito
              </span>
            )}
          </div>
        </header>

        <div className="p-4 md:p-6 lg:p-8">
          <PageHeader 
            title="Catálogo de Servicios" 
            subtitle="Selecciona los servicios que necesitas y realiza el pago"
          />

          {Object.keys(catalogo).length === 0 && (
            <div className="col-span-full text-center py-8 text-gray-500">
              {catalogoError ? (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-left">
                  <p className="text-red-700 font-semibold mb-2">Error de conexión:</p>
                  <p className="text-red-600 text-sm">{catalogoError}</p>
                  <button 
                    onClick={() => window.location.reload()}
                    className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Recargar página
                  </button>
                </div>
              ) : (
                <>
                  <p>Cargando servicios...</p>
                  <p className="text-sm mt-2">URL: {process.env.NEXT_PUBLIC_API_URL}</p>
                </>
              )}
            </div>
          )}
          
          {Object.keys(catalogo).length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Services List */}
              <div className="col-span-1 lg:col-span-2 space-y-4">
                {FASES.map((fase) => {
                const servicios = catalogo[fase] || [];
                if (servicios.length === 0) return null;
                const isExpanded = expandedFase === fase;
                return (
                  <div key={fase} className="bg-white rounded-2xl shadow-card overflow-hidden">
                    <button
                      onClick={() => setExpandedFase(isExpanded ? null : fase)}
                      className="w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r from-[#6802c1] to-[#7B2CBF] text-white"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                          {FASE_ICONS[fase]}
                        </span>
                        <span className="font-bold">{FASE_NAMES[fase]}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <svg className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>
                    
                    {isExpanded && (
                      <div className="divide-y divide-gray-50">
                        {servicios.map(servicio => {
                          const isPaid = pagosHistorico.includes(servicio.id);
                          const inCart = carrito.includes(servicio.id);
                          return (
                            <div key={servicio.id} className="p-4 hover:bg-gray-50 transition-colors">
                              <label className="flex items-center gap-4 cursor-pointer">
                                <div className={`relative ${isPaid ? '' : 'group'}`}>
                                  <input
                                    type="checkbox"
                                    disabled={isPaid}
                                    checked={isPaid || inCart}
                                    onChange={() => !isPaid && handleToggle(servicio)}
                                    className="sr-only peer"
                                  />
                                  <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                                    isPaid ? 'bg-green-500 border-green-500' :
                                    inCart ? 'bg-[#6802c1] border-[#6802c1]' :
                                    'border-gray-300 group-hover:border-[#6802c1]'
                                  }`}>
                                    {(isPaid || inCart) && (
                                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                      </svg>
                                    )}
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className={`font-medium ${isPaid ? 'text-green-600' : 'text-gray-900'}`}>
                                      {servicio.nombre}
                                    </span>
                                    {isPaid && (
                                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">Pagado</span>
                                    )}
                                  </div>
                                </div>
                                <span className={`font-bold ${servicio.precio === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                                  {servicio.precio === 0 ? 'Gratis' : `S/ ${servicio.precio}`}
                                </span>
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Cart Sidebar */}
            <div className="col-span-1 lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden sticky top-24 border border-gray-100">
                <div className="bg-gradient-to-r from-[#6802c1] via-[#7B2CBF] to-[#9333EA] px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">Carrito de Servicios</h3>
                      <p className="text-white/70 text-sm">{carrito.length} servicios seleccionados</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  {carrito.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                      </div>
                      <p className="text-gray-500 font-medium">Tu carrito está vacío</p>
                      <p className="text-gray-400 text-sm mt-1">Selecciona servicios para continuar</p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-48 overflow-y-auto mb-4">
                      {carrito.map(id => {
                        const s = allServicios.find(sv => sv.id === id);
                        return s && (
                          <div key={id} className="flex justify-between items-center text-sm py-3 px-3 bg-gray-50 rounded-xl">
                            <span className="text-gray-700 flex-1 pr-2 text-sm">{s.nombre}</span>
                            <span className="font-bold text-[#6802c1] whitespace-nowrap">S/ {s.precio.toLocaleString()}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  
                  <div className="bg-gradient-to-r from-purple-50 to-yellow-50 rounded-xl p-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-500 text-sm">Servicios</span>
                      <span className="font-semibold text-gray-700">{carrito.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-900 text-lg">Total</span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-[#6802c1] to-[#7B2CBF] bg-clip-text text-transparent">
                        S/ {totalCarrito.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  <button
                    disabled={carrito.length === 0}
                    onClick={() => setShowModal(true)}
                    className="w-full bg-gradient-to-r from-[#FFC20E] to-[#EAB308] hover:from-[#EAB308] hover:to-[#D97706] disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-gray-900 font-bold py-4 rounded-xl transition-all duration-300 shadow-lg shadow-yellow-500/30 hover:shadow-xl hover:shadow-yellow-500/40 flex items-center justify-center gap-3 text-lg"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Proceder al Pago
                  </button>
                </div>
              </div>
            </div>
          </div>
          )}
        </div>
      </main>

      {/* Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            {exito ? (
              <div className="p-10 text-center">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                  <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">¡Pago Exitoso!</h2>
                <p className="text-gray-500 mb-6">Tu comprobante de pago será enviado a tu correo electrónico</p>
                <div className="bg-green-50 rounded-2xl p-4 mb-6">
                  <p className="text-sm text-green-700">Monto pagado: <span className="font-bold">S/ {totalCarrito.toFixed(2)}</span></p>
                  <p className="text-sm text-green-700 mt-2">Saldo disponible: <span className="font-bold">S/ 19.00</span></p>
                </div>
                <button onClick={resetModal} className="bg-[#6802c1] text-white py-3 px-8 rounded-xl font-semibold hover:bg-[#5802a1] transition-colors">
                  Aceptar
                </button>
              </div>
            ) : (
              <>
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-[#6802c1] to-[#7B2CBF] px-6 py-5 rounded-t-3xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg">Pasarela de Pago</h3>
                        <p className="text-white/70 text-sm">Pago seguro - S/ {totalCarrito.toFixed(2)}</p>
                      </div>
                    </div>
                    <button onClick={resetModal} className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <form onSubmit={procesarPago} className="p-6 space-y-6">
                  {/* Payment Method */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Método de Pago</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setTipoPago("TARJETA")}
                        className={`p-5 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${
                          tipoPago === "TARJETA"
                            ? "border-[#6802c1] bg-gradient-to-br from-purple-50 to-purple-100 shadow-md"
                            : "border-gray-200 hover:border-gray-300 bg-white hover:shadow-md"
                        }`}
                      >
                        <div className="flex gap-2">
                          {/* Visa Icon */}
                          <div className={`w-12 h-8 rounded bg-gradient-to-r ${tipoPago === "TARJETA" ? "from-blue-600 to-blue-800" : "from-gray-300 to-gray-400"} flex items-center justify-center`}>
                            <span className="text-white font-bold text-xs italic">VISA</span>
                          </div>
                          {/* Mastercard Icon */}
                          <div className={`w-12 h-8 rounded flex items-center justify-center ${tipoPago === "TARJETA" ? "bg-gradient-to-r from-red-500 via-yellow-500 to-red-600" : "bg-gradient-to-r from-gray-300 to-gray-400"}`}>
                            <span className="text-white font-bold text-xs">MC</span>
                          </div>
                        </div>
                        <span className={`text-sm font-bold ${tipoPago === "TARJETA" ? 'text-[#6802c1]' : 'text-gray-600'}`}>Tarjeta Crédito/Débito</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setTipoPago("DNI")}
                        className={`p-5 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${
                          tipoPago === "DNI"
                            ? "border-[#6802c1] bg-gradient-to-br from-purple-50 to-purple-100 shadow-md"
                            : "border-gray-200 hover:border-gray-300 bg-white hover:shadow-md"
                        }`}
                      >
                        <div className="w-14 h-10 bg-gradient-to-br from-blue-700 to-blue-900 rounded-lg flex items-center justify-center shadow-sm">
                          <span className="text-white font-bold text-sm">DNI</span>
                        </div>
                        <span className={`text-sm font-bold ${tipoPago === "DNI" ? 'text-[#6802c1]' : 'text-gray-600'}`}>Pago con DNI</span>
                      </button>
                    </div>
                  </div>

                  {/* Bank Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Entidad Bancaria</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {BANCOS.map((b) => (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => setBanco(b.id)}
                          className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 hover:shadow-md ${
                            banco === b.id
                              ? "border-[#6802c1] bg-gradient-to-br from-purple-50 to-purple-100 shadow-md scale-105"
                              : "border-gray-200 hover:border-gray-300 bg-white"
                          }`}
                        >
                          <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md transition-transform" style={{ backgroundColor: b.color }}>
                            {b.iniciales}
                          </div>
                          <span className={`text-sm font-semibold ${banco === b.id ? 'text-[#6802c1]' : 'text-gray-700'}`}>{b.id}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* DNI Fields */}
                  {tipoPago === "DNI" && (
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-5 border-2 border-blue-100">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                          </svg>
                        </div>
                        <h4 className="font-bold text-gray-900">Datos del Pagador (RENIEC)</h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">DNI</label>
                          <input
                            type="text"
                            maxLength={8}
                            value={dniPagador}
                            onChange={e => {
                              const val = e.target.value.replace(/\D/g, '');
                              setDniPagador(val);
                              if (val.length === 8) buscarDNI(val);
                              else setDniNombre("");
                            }}
                            placeholder=""
                            className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-mono text-lg tracking-wider"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">Nombre Completo</label>
                          <div className={`px-4 py-3 bg-white border-2 rounded-xl min-h-[48px] flex items-center ${dniBuscando ? 'border-blue-300' : dniNombre ? 'border-green-300 bg-green-50' : 'border-gray-200'}`}>
                            {dniBuscando ? (
                              <div className="flex items-center gap-2 text-blue-600">
                                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                <span className="text-sm">Buscando...</span>
                              </div>
                            ) : dniNombre ? (
                              <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="font-semibold text-green-700">{dniNombre}</span>
                              </div>
                            ) : (
                              <span className="text-gray-400 text-sm">Ingrese DNI de 8 dígitos</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">Fecha de Nacimiento</label>
                          <input
                            type="date"
                            value={fechaNacimiento}
                            onChange={e => setFechaNacimiento(e.target.value)}
                            className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">Región</label>
                          <select
                            disabled
                            className="w-full px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-xl outline-none"
                          >
                            <option value="Junin">Junín</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">Provincia</label>
                          <select
                            value={provinciaPagador}
                            onChange={e => setProvinciaPagador(e.target.value)}
                            className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                          >
                            <option value="">Seleccionar</option>
                            <option value="Huancayo">Huancayo</option>
                            <option value="Junin">Junín</option>
                            <option value="Tarma">Tarma</option>
                            <option value="Jauja">Jauja</option>
                            <option value="Chanchamayo">Chanchamayo</option>
                            <option value="Satipo">Satipo</option>
                            <option value="La Oroya">La Oroya</option>
                            <option value="Cerro de Pasco">Cerro de Pasco</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-4 mt-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">Distrito</label>
                          <select className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all">
                            <option value="">Seleccionar</option>
                            <option value="Huancayo">Huancayo</option>
                            <option value="El Tambo">El Tambo</option>
                            <option value="Chilca">Chilca</option>
                            <option value="Pilcomayo">Pilcomayo</option>
                            <option value="Culluchaca">Culluchaca</option>
                            <option value="Hualhuas">Hualhuas</option>
                            <option value="Ingenio">Ingenio</option>
                            <option value="Quilcas">Quilcas</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Order Summary */}
                  <div className="bg-gradient-to-br from-purple-50 via-white to-yellow-50 rounded-2xl p-5 border-2 border-purple-100">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 bg-[#6802c1] rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <h4 className="font-bold text-gray-900">Resumen del Pedido</h4>
                    </div>
                    <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
                      {carrito.map(id => {
                        const s = allServicios.find(sv => sv.id === id);
                        return s && (
                          <div key={id} className="flex justify-between items-center text-sm py-2 px-3 bg-white rounded-lg shadow-sm">
                            <span className="text-gray-700 flex-1">{s.nombre}</span>
                            <span className="font-bold text-[#6802c1] ml-2">S/ {s.precio.toLocaleString()}</span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="bg-gradient-to-r from-[#6802c1] to-[#7B2CBF] rounded-xl p-4 flex justify-between items-center">
                      <span className="font-bold text-white text-lg">Total a Pagar</span>
                      <span className="text-3xl font-bold text-white">S/ {totalCarrito.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={resetModal}
                      className="flex-1 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={procesando || !banco}
                      className="flex-[2] py-4 bg-gradient-to-r from-[#FFC20E] to-[#EAB308] hover:from-[#EAB308] hover:to-[#D97706] disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-gray-900 font-bold rounded-xl transition-all shadow-lg shadow-yellow-500/30 flex items-center justify-center gap-3 text-lg"
                    >
                      {procesando ? (
                        <>
                          <svg className="animate-spin w-6 h-6" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Procesando pago...
                        </>
                      ) : (
                        <>
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                          Confirmar Pago
                        </>
                      )}
                    </button>
                  </div>

                  {/* Security Badge */}
                  <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500 bg-gray-50 rounded-xl py-3">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span>Pago seguro</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span>Datos encriptados</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>Comprobante por email</span>
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
