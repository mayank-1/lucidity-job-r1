import Switch from 'react-switch'

type Props = {
  checked: boolean,
  onChange: (checked: boolean) => void,
  offColor?: string,
  onColor?: string,
  disabled?: boolean,
  height?: number,
  width?: number,
  onHandleColor?: string,
}

const Toggle = ({checked, offColor, onColor, onHandleColor, disabled, height, width, onChange, ...rest}: Props) => {
  return (
    <Switch 
      onChange={onChange} 
      offColor={offColor} 
      onColor={onColor} 
      disabled={disabled} 
      checked={checked} 
      uncheckedIcon={false}
      checkedIcon={false}
      height={height}
      width={width}
      onHandleColor={onHandleColor}
      {...rest}
    />
  )
}

export default Toggle;