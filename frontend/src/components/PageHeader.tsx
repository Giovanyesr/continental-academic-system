"use client";

import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  badge?: {
    text: string;
    variant?: "success" | "warning" | "error" | "info" | "primary";
  };
}

const variantStyles = {
  success: "bg-green-100 text-green-700 border-green-200",
  warning: "bg-yellow-100 text-yellow-700 border-yellow-200",
  error: "bg-red-100 text-red-700 border-red-200",
  info: "bg-blue-100 text-blue-700 border-blue-200",
  primary: "bg-purple-100 text-purple-700 border-purple-200",
};

export default function PageHeader({ title, subtitle, actions, badge }: PageHeaderProps) {
  return (
    <div className="mb-8">
      {/* Línea decorativa superior */}
      <div className="h-1 w-20 bg-gradient-to-r from-[#6802C1] to-[#FFC20E] rounded-full mb-6" />
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-2">
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#111827] to-[#4B5563] bg-clip-text text-transparent">
              {title}
            </h1>
            {badge && (
              <span className={`whitespace-nowrap px-3 py-1 mt-1 rounded-full text-xs font-bold border ${variantStyles[badge.variant || "primary"]}`}>
                {badge.text}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-gray-500 text-base">{subtitle}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </div>
  );
}
