import { configureStore } from '@reduxjs/toolkit'
import carReducer from './slices/reducer';

const reducer = {
  cars: carReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;