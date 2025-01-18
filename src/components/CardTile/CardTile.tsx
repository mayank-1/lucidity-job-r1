// COMPONENTS
import Icon from '../Icon/Icon';

// CSS
import './CardTile.scss';

type Props = {
    iconName: string,
    title: string,
    value?: string | number
}

const CardTile = (props: Props) => {
    return (
        <div className='card-container'>
            <Icon name={props.iconName} className='color-white'/>
            <div className='value-container'>
                <span>{props.title}</span>
                <span>{props.value}</span>
            </div>
        </div>
    )
}

export default CardTile