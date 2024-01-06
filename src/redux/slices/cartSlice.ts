import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { calcTotalPrice } from "../../utils/calcTotalPrice";

export type CartType = {
    id: number,
    title: string,
    imageUrl: string,
    price: number,
    size: number,
    type: string,
    count: number,
    rating: number,
}

interface CartSliceInt {
    totalPrice: number,
    cart: CartType[],
}

const initialState: CartSliceInt = {
    totalPrice: getCartFromLS().totalPrice,
    cart: getCartFromLS().cart,
}

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        setLogInfo(state, action){

        },
        setAddCart(state, action) {
            const findItem = state.cart.find(obj => obj.id === action.payload.id);       
            if (findItem) {
                findItem.count++;
            } else {
                state.cart.push({
                    ...action.payload,
                    count: 1,
                })
            }
            state.totalPrice = calcTotalPrice(state.cart);
        },
        minusItem(obj, action: PayloadAction<number>) {
            const findItem = obj.cart.find(obj => obj.id === action.payload);
            if (findItem) {
                findItem.count--;
                obj.totalPrice -= findItem.price;
            }
        },
        setRemoveCart(obj, action: PayloadAction<number>) {
            const findItem = obj.cart.find(obj => obj.id === action.payload);
            obj.cart = obj.cart.filter(obj => obj.id !== action.payload);
            obj.totalPrice -= findItem!.price * findItem!.count;
        },
        setClearCart(obj) {
            localStorage.clear();
            obj.cart = [];
            obj.totalPrice = 0;
        },
    }
})

export const countCartSlice = (id: number) => (state: RootState) => state.cartSlice.cart.find(obj => obj.id === id);

export const { setAddCart, minusItem, setRemoveCart, setClearCart, setLogInfo } = cartSlice.actions;
export default cartSlice.reducer;