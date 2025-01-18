import React from 'react';
import classNames from 'classnames';

// CSS
import './Input.scss';

type InputProps = {
  label: string;
  name: string;
  type?: string;
  value: string | number;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  inputClassName?: string; // New prop for customizing input field styles
  disabled?: boolean;
};

const Input = ({
  label,
  name,
  type = 'text',
  value,
  placeholder = '',
  onChange,
  className = '',
  inputClassName = '',
  disabled = false,
}: InputProps) => {
  return (
    <div className={classNames('input-container', className)}>
      <label htmlFor={name} className="input-label">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={classNames('input-field', inputClassName)} // Apply custom class
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
