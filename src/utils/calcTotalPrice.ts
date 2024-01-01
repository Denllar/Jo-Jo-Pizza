import { CartType } from "../redux/slices/cartSlice";

export const calcTotalPrice = (cart: CartType[])=>{
    return cart.reduce((acc, cur) => cur.price * cur.count + acc, 0);
}