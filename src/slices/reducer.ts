import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import CarDataService from "../services/car.service";
import { CarItem } from "../Interface/CarModel";

interface InitialState {
    carItems: CarItem[];
}

const initialState: InitialState = {
    carItems: [],
};


export const addCarItemAsync = createAsyncThunk(
    "cars/add",
    async (data: CarItem) => {
        const res = await CarDataService.create(data);
        return res.data as CarItem;
    }
);

export const getAllCarItemAsync = createAsyncThunk(
    "cars/getall",
    async () => {
        const res = await CarDataService.getAll();
        return res.data as CarItem[];
    }
);

const carSlice = createSlice({
    name: "cars",
    initialState: initialState,
    reducers: {
        addCarItem: (state, action: PayloadAction<CarItem>) => {
            state.carItems.push(action.payload);
        },
        getAllCarItem: (state, action: PayloadAction<CarItem[]>) => {
            state.carItems = action.payload as CarItem[];
        },
    },
    extraReducers: (builder) => {

        builder.addCase(getAllCarItemAsync.fulfilled, (state, action) => {
            state.carItems = action.payload as CarItem[];
        });
    },
});

const { reducer } = carSlice;
export const { addCarItem, getAllCarItem } = carSlice.actions;
export default reducer;