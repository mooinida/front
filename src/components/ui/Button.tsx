import React from 'react'

export function Button({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}