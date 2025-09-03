import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className, ...props }) => {
  const baseClasses = "px-6 py-2.5 rounded-md font-montserrat font-semibold text-sm uppercase tracking-wider transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-md hover:shadow-lg active:shadow-sm";

  const variantClasses = {
    primary: "bg-primary text-white hover:bg-primary-dark focus:ring-primary",
    secondary: "bg-surface text-primary border border-primary hover:bg-primary/10 focus:ring-primary shadow-none",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600",
  };
  
  const dangerSecondary = "bg-transparent text-red-600 hover:bg-red-50 focus:ring-red-600 shadow-none";

  // Fix: The condition `variant !== 'primary'` was removed as it is redundant
  // when `variant === 'danger'` is already checked, which caused a TypeScript error.
  if (variant === 'danger' && props.type !== 'submit') {
      return (
           <button className={`${baseClasses} ${dangerSecondary} ${className}`} {...props}>
                {children}
            </button>
      )
  }


  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;