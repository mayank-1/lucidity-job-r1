import {useState} from 'react'

// COMPONENTS
import Toggle from '../Toggle/Toggle'
import Icon from '../Icon/Icon'

// CSS
import './NavBar.scss'

type Props = {}

const NavBar = (props: Props) => {
    const [isUser, setIsUser] = useState(false)


    const handleToggleChange = (value: boolean) => {
        setIsUser(value)
    }
  return (
    <div className='nav-container'>
        <div className='toggle-section'>
            <span>admin</span>
            <Toggle onChange={handleToggleChange} onColor={isUser ? '#7e8945':''} onHandleColor={isUser ? '#e5fd72' : ''} checked={isUser} height={20} width={48} />
            <span>user</span>
        </div>
        <Icon name='fa-solid fa-arrow-right-from-bracket' className='color-white'/>
    </div>
  )
}

export default NavBar