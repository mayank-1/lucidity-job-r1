
import { toast } from 'react-toastify'

import { AppDispatch } from '../store'; // adjust path as needed
import { setItems, setLoading, setError } from './../features/inventorySlice';

// TYPE
import { Item } from '../../utils/utils';

export const fetchInventory = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch('https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory');
    const result = await response.json();
    const newResult = result.map((item: Item) => ({...item, disabled: false}))
    dispatch(setItems(newResult));
    dispatch(setLoading(false));
  } catch (error: any) {
    toast.error('Oops! Please try again later')
    dispatch(setError(error));
    dispatch(setLoading(false));
  }
};
