'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'secondary';
  children: React.ReactNode;
}

export function Button({ 
  variant = 'default', 
  children, 
  className = '', 
  ...props 
}: ButtonProps) {
  const baseStyles = "px-6 py-3 rounded-lg font-semibold transition-all duration-300";
  
  const variants = {
    default: "bg-white text-[#5D4E37] hover:bg-gray-100 hover:scale-105",
    outline: "bg-white text-[#5D4E37] border border-[#5D4E37] hover:bg-[#d6c2a8]",
    secondary: "bg-[#3D2E1F] text-white hover:bg-[#2C1810]"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
