import React from 'react';
import classNames from 'classnames';

// CSS
import './Button.scss';

type ButtonProps = {
  label: string;
  variant?: 'button' | 'link'; // Specifies the styling variant
  onClick: () => void;
  className?: string;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'button',
  onClick,
  className = '',
  disabled = false,
}) => {
  return (
    <button
      className={classNames(
        'btn',
        { 'btn-normal': variant === 'button', 'btn-link': variant === 'link' },
        className,
        { disabled }
      )}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
