import classNames from 'classnames';

// CSS
import './Icon.scss';

type Props = {
  name: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;  // Made onClick optional
};

const Icon = ({ name, className = '', disabled = false, onClick }: Props) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();  // Call onClick only if not disabled
    }
  };

  return (
    <i
      className={classNames(name, className, { ['disabled']: disabled, ['active']: !disabled })}
      onClick={handleClick}
      aria-disabled={disabled}  // A11y improvement: add aria-disabled
      role="button"  // Consider using button role for accessibility
      tabIndex={0}  // Allow keyboard interaction if clickable
      aria-label={name} // Optional: You can add a custom label for each icon if needed
    ></i>
  );
};

export default Icon;
