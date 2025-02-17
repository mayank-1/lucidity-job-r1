import React, {useEffect, useState, useRef} from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

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
    const [formError, setFormError] = useState({categoryError: '', priceError: '', quantityError: '', valueError: ''})
    const dispatch = useDispatch<AppDispatch>()
    const initialFormState = useRef<Item>({} as Item)

    const handleSaveItem = () => {
        if (JSON.stringify(formObj) !== JSON.stringify(initialFormState.current)) { // Check if the current formObj data is different from the initial selected data, then only do the update
            const itemObj = formObj as Item;

            const newItem = {
                ...itemObj,
                price: ensureDollarPrefix(itemObj.price),
                value: ensureDollarPrefix(itemObj.value),
            };
    
            dispatch(updateItem(newItem));
            toast.success('Product updated successfully')
        } else {
            toast.info('No changes detected')
        }
        handleClose()
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const { value } = e.target;

        setFormObj(prev => ({ ...prev, [name]: value }));

        setFormError(prev => ({
            ...prev,
            [`${name}Error`]: value ? '' : `${name} can't be empty`
        }));
    }

    useEffect(() => {
        if (Object.keys(selected).length > 0) {
            setFormObj(selected)
            initialFormState.current = selected as Item
        }
    },[selected])

    const handleClose = () => {
        setSelected({})
        setFormObj({})
        setFormError({categoryError: '', priceError: '', quantityError: '', valueError: ''})
    }
 
    const item = formObj as Item;

    return (
        <Modal isOpen={Object.keys(selected).length > 0} onClose={handleClose} title="Edit product" modalContainerClassName='modalContainer'>
            <span className='item-name'>{item.name || '-'}</span>
            <div className='modalBody'>
                <div className='flex-column'>
                    <Input label="Category" name="category" value={item.category} onChange={(e) => handleInputChange(e, 'category')}/>
                    {formError.categoryError && <span className='delete-red error-message'>{formError.categoryError}</span>}
                </div>
                <div className='flex-column'>
                    <Input label="Price" name="price" value={removeCurrencyFromValue('$',item.price)} onChange={(e) => handleInputChange(e, 'price')}/>
                    {formError.priceError && <span className='delete-red error-message'>{formError.priceError}</span>}
                </div>
                <div className='flex-column'>
                    <Input label="Quantity" name="quantity" value={item.quantity} onChange={(e) => handleInputChange(e, 'quantity')}/>
                    {formError.quantityError && <span className='delete-red error-message'>{formError.quantityError}</span>}
                </div>
                <div className='flex-column'>
                    <Input label="Value" name="value" value={removeCurrencyFromValue('$',item.value)} onChange={(e) => handleInputChange(e, 'value')} />
                    {formError.valueError && <span className='delete-red error-message'>{formError.valueError}</span>}
                </div>
            </div>
            <div className='modalFooter'>
                <Button label='Cancel' variant='link' onClick={handleClose}/>
                <Button label='Save' onClick={handleSaveItem} disabled={Object.values(formError).some(error => error !== '')}/>
            </div>
        </Modal>
    )
}

export default EditItemModal