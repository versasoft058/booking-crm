import { ReactNode } from "react";

interface ButtonProps {
  variant?: "primary" | "secondary";
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  variant = "primary",
  children,
  className = "",
  onClick,
  type = "button",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg font-semibold text-sm px-6 py-3 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#6C5CE7]";

  const variants = {
    primary:
      "bg-gradient-to-r from-[#6C5CE7] to-[#22D3EE] text-white shadow-[0_4px_16px_rgba(108,92,231,0.35)] hover:shadow-[0_6px_24px_rgba(108,92,231,0.45)] hover:scale-[1.02] active:scale-[0.99]",
    secondary:
      "bg-white text-[#0B0F19] border border-[rgba(15,23,42,0.12)] shadow-[var(--shadow-card)] hover:bg-[#F1F5F9] hover:shadow-[var(--shadow-card-hover)] active:scale-[0.99]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
