import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sortIdType } from "./filterSlice";


type FecthPizzasArgs = {
    activeIndex: number,
    sortId: sortIdType,
    invertBtn: boolean,
}

type itemsType = {
    id: number,
    title: string,
    imageUrl: string,
    price: number,
    size: number[],
    type: string[],
    rating: number,
}

interface pizzaSliceInt {
    items: itemsType[],
    status: 'loading' | 'success' | 'error',
    invertBtn: false | true;
}

export const fetchPizzas = createAsyncThunk(
    'pizzas/fetchPizzasStatus',
    async ({ activeIndex, sortId, invertBtn }: FecthPizzasArgs) => {
        const { data } = await axios.get<itemsType[]>(`https://aed4fd69a9cf3971.mokky.dev/pizzas${activeIndex > 0 ? `?category=${activeIndex}&` : '?'}&sortBy=${invertBtn===true ? '-' : ''}${sortId.sortProperty}`);
        return data;
    }
)

enum Status {
    LOADING = 'loading', 
    SUCCESS = 'success',
    ERROR = 'error',
}

const initialState: pizzaSliceInt = {
    items: [],
    status: Status.LOADING,
    invertBtn: false,
}

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
        setInvertBtn(state) {
            state.invertBtn = !state.invertBtn;
            console.log(state.invertBtn);   
        },
    },
    extraReducers: (builder) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        builder.addCase(fetchPizzas.pending, (state) => {
            state.status = Status.LOADING;
            state.items = [];
        }),
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;
        }),builder.addCase(fetchPizzas.rejected, (state) => {
            state.status = Status.ERROR;
            state.items = [];
        })
    }
})


export const { setItems, setInvertBtn } = pizzaSlice.actions;
export default pizzaSlice.reducer;