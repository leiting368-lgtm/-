import React from 'react';

interface IconProps {
  name: string;
  onClick: () => void;
}

const Icon: React.FC<IconProps> = ({ name, onClick }) => {
  return (
    <div className="dd-desktop-icon" onClick={onClick}>
      <span className="dd-desktop-icon-label">{name}</span>
    </div>
  );
};

export default Icon;
