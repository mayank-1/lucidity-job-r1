import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface Inventory {
    name: string,
    category: string,
    value: string,
    quantity: number,
    price: string,
    disabled: boolean,
}

interface InventoryState {
    items: Inventory[],
    loading: boolean;
    error: string | null;
}

const initialState: InventoryState = {
    items: [],
    loading: false,
    error: null,
}

export const InventorySlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<Inventory[]>) => {
            state.items = action.payload;
        },
        updateItem: (state, action: PayloadAction<Inventory>) => {
            const index = state.items.findIndex(item => item.name === action.payload.name);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.name !== action.payload);
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    }
})

export default InventorySlice.reducer;
export const { updateItem, removeItem, setItems, setError, setLoading } = InventorySlice.actions;