import { ReactNode, FormEvent } from "react";

interface FormWrapperProps {
  children: ReactNode;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  className?: string;
}

export default function FormWrapper({ children, onSubmit, className = "" }: FormWrapperProps) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-[0_2px_24px_rgba(15,23,42,0.08)] p-8 md:p-10 ${className}`}
    >
      <form onSubmit={onSubmit} noValidate>
        {children}
      </form>
    </div>
  );
}
