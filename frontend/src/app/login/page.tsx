"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("75185427@continental.edu.pe");
  const [password, setPassword] = useState("giovany75185427");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login(email, password);

      if (!result.success) {
        setError(result.message || "Error al iniciar sesión");
        return;
      }

      router.push("/portal");

    } catch (error) {
      console.error("LOGIN ERROR:", error);
      setError("Error interno del servidor");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white font-sans">

      {/* Left Side - Brand Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#6802c1] via-[#7B2CBF] to-[#4b0082] relative overflow-hidden items-center justify-center p-12">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFC20E] opacity-10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white opacity-5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
        </div>

        {/* Decorative Circles */}
        <div className="absolute top-20 left-20 w-32 h-32 border border-white/10 rounded-full" />
        <div className="absolute bottom-40 right-20 w-48 h-48 border border-white/5 rounded-full" />
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-[#FFC20E] rounded-full" />
        <div className="absolute top-1/3 left-1/3 w-3 h-3 bg-white/20 rounded-full" />

        {/* Content */}
        <div className="relative z-10 max-w-lg">
          {/* Logo */}
          <div className="mb-12">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-2xl mb-8">
              <Image
                src="/logocontinental.png"
                alt="Universidad Continental"
                width={90}
                height={90}
                className="object-contain"
              />
            </div>
            <h1 className="text-5xl xl:text-6xl font-bold text-white mb-4 leading-tight">
              Portal del<br />
              <span className="text-[#FFC20E]">Estudiante</span>
            </h1>
            <p className="text-xl text-white/70 max-w-md">
              Gestiona tus trámites, servicios académicos y más en un solo lugar.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="text-4xl font-bold text-[#FFC20E] mb-1">32</div>
              <div className="text-sm text-white/60">Servicios</div>
            </div>
            <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="text-4xl font-bold text-[#FFC20E] mb-1">24/7</div>
              <div className="text-sm text-white/60">Soporte</div>
            </div>
            <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="text-4xl font-bold text-[#FFC20E] mb-1">100%</div>
              <div className="text-sm text-white/60">Online</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-6 py-12 lg:py-20">
        <div className="w-full max-w-md">

          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#6802c1] to-[#7B2CBF] rounded-2xl flex items-center justify-center shadow-xl">
              <Image
                src="/logocontinental.png"
                alt="UC"
                width={50}
                height={50}
                className="object-contain"
              />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              ¡Bienvenido!
            </h2>
            <p className="text-gray-500">
              Ingresa tus credenciales para continuar
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-white border-2 border-gray-100 rounded-3xl p-8 shadow-lg shadow-gray-200/50">
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  Correo institucional
                </label>
                <div className="relative group">
                  <div className={`absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#6802c1] transition-all duration-300 ${email ? 'opacity-0 -translate-x-2 pointer-events-none' : 'opacity-100'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="correo@continental.edu.pe"
                    className={`w-full pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl outline-none transition-all duration-300 placeholder:text-gray-400 focus:bg-white focus:border-[#6802c1] focus:ring-4 focus:ring-[#6802c1]/10 ${email ? 'pl-4' : 'pl-12'}`}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-sm font-semibold text-gray-700">
                    Contraseña
                  </label>
                  <a href="#" className="text-sm text-[#6802c1] hover:text-[#7B2CBF] font-medium transition-colors">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
                <div className="relative group">
                  <div className={`absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#6802c1] transition-all duration-300 ${password ? 'opacity-0 -translate-x-2 pointer-events-none' : 'opacity-100'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingresa tu contraseña"
                    className={`w-full pr-14 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl outline-none transition-all duration-300 placeholder:text-gray-400 focus:bg-white focus:border-[#6802c1] focus:ring-4 focus:ring-[#6802c1]/10 ${password ? 'pl-4' : 'pl-12'}`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl text-sm flex items-center gap-3 animate-pulse">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FFC20E] hover:bg-[#E6AE0C] text-gray-900 font-bold py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-[#FFC20E]/30 hover:shadow-xl hover:shadow-[#FFC20E]/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2 text-lg"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Procesando...
                  </>
                ) : (
                  <>
                    Iniciar Sesión
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Divider with social login */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm text-gray-400">o continúa con</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3.5 px-4 bg-white border-2 border-gray-200 rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-3.5 px-4 bg-white border-2 border-gray-200 rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Microsoft</span>
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Av. San Carlos 1980, Huancayo</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>064 481430</span>
              </div>
            </div>

            <div className="mt-4 flex justify-center">
              <Link href="/" className="flex items-center gap-1 text-[#6802c1] hover:text-[#7B2CBF] font-medium transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Volver al inicio
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
