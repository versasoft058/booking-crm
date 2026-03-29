import { InputHTMLAttributes, forwardRef } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, id, className = "", ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className="text-xs font-semibold text-[#474554] tracking-wide"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={`w-full bg-[#F2F4F6] rounded-lg px-4 py-3 text-sm text-[#191c1e] placeholder:text-[#787586] outline-none transition-all duration-150 focus:bg-white focus:ring-2 focus:ring-[#6C5CE7]/25 focus:shadow-[0_0_0_2px_rgba(108,92,231,0.15)] ${
            error ? "ring-2 ring-[#ba1a1a]/40" : ""
          } ${className}`}
          {...props}
        />
        {error && (
          <p className="text-xs text-[#ba1a1a] mt-0.5">{error}</p>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";
export default InputField;
