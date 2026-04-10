"use client";

import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 z-[100] transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`px-5 py-3 rounded shadow-lg flex items-center gap-3 text-white font-medium ${
          type === "success" ? "bg-green-600" : "bg-red-600"
        }`}
      >
        <span>{type === "success" ? "✓" : "✕"}</span>
        <span>{message}</span>
      </div>
    </div>
  );
}
