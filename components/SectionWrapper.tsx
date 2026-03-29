import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  bg?: "default" | "surface" | "surface-low" | "secondary";
  id?: string;
}

export default function SectionWrapper({
  children,
  className = "",
  bg = "default",
  id,
}: SectionWrapperProps) {
  const backgrounds = {
    default: "bg-[#F8FAFC]",
    surface: "bg-white",
    "surface-low": "bg-[#F1F5F9]",
    secondary: "bg-[#0F172A]",
  };

  return (
    <section
      id={id}
      className={`py-20 md:py-28 ${backgrounds[bg]} ${className}`}
    >
      {children}
    </section>
  );
}
