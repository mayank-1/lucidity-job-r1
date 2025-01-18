// COMPONENTS
import Toggle from '../Toggle/Toggle'
import Icon from '../Icon/Icon'

// CSS
import './NavBar.scss'

type Props = {
    isUser: boolean,
    setUser: (value: boolean) => void
}

const NavBar = (props: Props) => {
    const handleToggleChange = (value: boolean) => {
        props.setUser(value)
    }
    return (
        <div className='nav-container'>
            <div className='toggle-section'>
                <span>admin</span>
                <Toggle onChange={handleToggleChange} onColor={props.isUser ? '#7e8945':undefined} onHandleColor={props.isUser ? '#e5fd72' : undefined} checked={props.isUser} height={20} width={48} />
                <span>user</span>
            </div>
            <Icon name='fa-solid fa-arrow-right-from-bracket' className='color-white'/>
        </div>
    )
}

export default NavBar