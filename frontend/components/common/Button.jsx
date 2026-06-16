"use client";

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
}) {
  const styles = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white",
    danger:
      "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-5 py-2 rounded-lg transition font-medium ${styles[variant]}`}
    >
      {children}
    </button>
  );
}