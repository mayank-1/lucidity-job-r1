import { AppDispatch } from '../store'; // adjust path as needed
import { setItems, setLoading, setError } from './../features/inventorySlice';

export const fetchInventory = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch('https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory');
    const result = await response.json();
    dispatch(setItems(result));
    dispatch(setLoading(false));
  } catch (error: any) {
    dispatch(setError(error));
    dispatch(setLoading(false));
  }
};
