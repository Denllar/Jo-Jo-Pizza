import { PayloadAction, createSlice } from "@reduxjs/toolkit"; 
import { RootState } from "../store";

export type sortIdType = {
    name: string,
    sortProperty: 'rating' | 'title' | 'price',
}

interface filterSliceInt {
    activeIndex: number,
    sortId: sortIdType,
    searchValue: string,
}

const initialState: filterSliceInt = {
    activeIndex: 0,
    sortId: {
        name: 'популярное',
        sortProperty: 'rating'
    },  
    searchValue: '',
};

const filterSlice = createSlice({
    name: 'filterSlice',
    initialState,
    reducers: {
        setActiveIndex(state, action: PayloadAction<number>){
            state.activeIndex = action.payload;
        },
        setSortId(state, action){
            state.sortId = action.payload;
        },
        setSearchValue(state, action: PayloadAction<string>){
            state.searchValue = action.payload;
        }
    }
})

export const selectFilter = (state: RootState)=>state.filterReducer.activeIndex;
export const {setActiveIndex, setSortId, setSearchValue} = filterSlice.actions;
export default filterSlice.reducer;
