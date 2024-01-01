import { CartType } from "../redux/slices/cartSlice";
import { calcTotalPrice } from "./calcTotalPrice";

export const getCartFromLS = () => {
    const data = localStorage.getItem('cart');
    const json = data ? JSON.parse(data) : [];
    const totalPrice = calcTotalPrice(json);
    return {
        cart: json as CartType[],
        totalPrice,
    }
}
