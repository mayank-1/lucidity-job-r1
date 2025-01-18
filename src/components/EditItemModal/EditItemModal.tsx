import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';

// COMPONENTS
import Modal from '../Modal/Modal';
import Input from '../Input/Input';
import Button from '../Button/Button';

// TYPES
import { Item, removeCurrencyFromValue, ensureDollarPrefix } from '../../utils/utils';

// STORE
import { AppDispatch } from '../../store/store';
import { updateItem } from '../../store/features/inventorySlice';

// CSS
import './EditItemModal.scss'


type Props = {
    selected: {} | Item,
    setSelected: (data: object) => void,
}

const EditItemModal = ({selected, setSelected}: Props) => {
    const [formObj, setFormObj] = useState({})
    const dispatch = useDispatch<AppDispatch>()

    const handleSaveItem = () => {
        const itemObj = formObj as Item;

        const newItem = {
            ...itemObj,
            price: ensureDollarPrefix(itemObj.price),
            value: ensureDollarPrefix(itemObj.value),
        };

        dispatch(updateItem(newItem));
        setSelected({});
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        setFormObj(prev => ({...prev, [name]: e.target.value}))
    }

    useEffect(() => {
        if (Object.keys(selected).length > 0) {
            setFormObj(selected)
        }
    },[selected])

    const item = formObj as Item;

    return (
        <Modal isOpen={Object.keys(selected).length > 0} onClose={() => setSelected({})} title="Edit product" modalContainerClassName='modalContainer'>
            <span className='item-name'>{item.name || '-'}</span>
            <div className='modalBody'>
                <Input label="Category" name="category" value={item.category} onChange={(e) => handleInputChange(e, 'category')}/>
                <Input label="Price" name="price" value={removeCurrencyFromValue('$',item.price)} onChange={(e) => handleInputChange(e, 'price')}/>
                <Input label="Quantity" name="quantity" value={item.quantity} onChange={(e) => handleInputChange(e, 'quantity')}/>
                <Input label="Value" name="value" value={removeCurrencyFromValue('$',item.value)} onChange={(e) => handleInputChange(e, 'value')} />
            </div>
            <div className='modalFooter'>
                <Button label='Cancel' variant='link' onClick={() => setSelected({})}/>
                <Button label='Save' onClick={handleSaveItem}/>
            </div>
        </Modal>
    )
}

export default EditItemModal