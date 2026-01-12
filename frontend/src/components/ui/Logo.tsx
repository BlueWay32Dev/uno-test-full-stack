import React from 'react';

interface LogoProps {
  position?: 'absolute' | 'relative';
}

export const Logo: React.FC<LogoProps> = ({ position = 'absolute' }) => {
  return (
    <div className={`${position} top-8 left-8`}>
      <div className="bg-white rounded-lg shadow-uno px-4 py-3">
        <img
          src="https://static.uno.cl/images/logo-unoafp.svg"
          alt="AFP UNO"
          className="h-10 w-auto"
        />
      </div>
    </div>
  );
};
