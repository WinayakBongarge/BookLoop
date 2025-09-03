
import React from 'react';

interface IconProps {
  name: string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, className = '' }) => {
  return (
    <span className={`material-icons-outlined ${className}`} aria-hidden="true">
      {name}
    </span>
  );
};

export default Icon;
