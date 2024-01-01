import { configureStore } from '@reduxjs/toolkit'
import  filterReducer   from './slices/filterSlice'
import cartSlice from './slices/cartSlice'
import pizzaSlice from './slices/pizzaSlice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    filterReducer,
    cartSlice,
    pizzaSlice,
  }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;