import { useState } from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

type customInputType<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  fieldName: string;
  inptType?: string;
  placeholder?: string;
  className?: string;
};

function formatLabel(fieldName: string) {
  return fieldName
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase())
    .trim();
}

export function CustomInput<T extends FieldValues>({
  control,
  name,
  fieldName,
  inptType = "text",
  placeholder,
  className,
}: customInputType<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = inptType === "password" || name === "password";
  const isGenderField = name === "gender";
  const labelText = formatLabel(fieldName);

  return (
    <>
      <label
        htmlFor={fieldName as string}
        className="text-sm font-semibold text-slate-700"
      >
        {labelText}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          const fieldValue = value ?? "";

          return (
            <div className="space-y-2">
              {isGenderField ? (
                <select
                  id={fieldName}
                  name={fieldName}
                  value={fieldValue}
                  onChange={(event) => onChange(event.target.value)}
                  className={
                    className ??
                    `w-full rounded-2xl border px-4 py-3.5 text-sm text-slate-800 shadow-sm outline-none transition-all duration-200 ${
                      error
                        ? "border-rose-300 bg-rose-50 focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
                        : "border-slate-200 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    }`
                  }
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              ) : (
                <div className="relative">
                  <input
                    type={
                      isPasswordField
                        ? showPassword
                          ? "text"
                          : "password"
                        : inptType
                    }
                    id={fieldName}
                    name={fieldName}
                    placeholder={placeholder ?? "......"}
                    value={fieldValue}
                    onChange={onChange}
                    className={
                      className ??
                      `w-full rounded-2xl border px-4 py-3.5 pr-24 text-sm text-slate-800 shadow-sm outline-none transition-all duration-200 ${
                        error
                          ? "border-rose-300 bg-rose-50 focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
                          : "border-slate-200 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      }`
                    }
                  />
                  {isPasswordField ? (
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-3 flex items-center text-sm font-medium text-indigo-600 transition hover:text-indigo-700"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  ) : null}
                </div>
              )}

              {error && (
                <p className="text-sm text-rose-600">{error.message}</p>
              )}
            </div>
          );
        }}
      />
    </>
  );
}
