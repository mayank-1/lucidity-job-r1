import classNames from 'classnames'

type Props = {
    name: string,
    className?: string
}

const Icon = ({name, className = ''}: Props) => {
  return (
    <i className={classNames(name,className)}></i>
  )
}

export default Icon