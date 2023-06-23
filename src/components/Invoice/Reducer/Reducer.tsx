import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface cartProduct{
    product:any,
}

const initialState:cartProduct={
    product:[],
}

const invoiceSlice=createSlice({
    name:'Invoice',
    initialState,
    reducers:{
        setCartProducts:(state,action:PayloadAction<any>)=>{
            return{
                ...state,
                product:action.payload,
            }
        }
    }
})

export const {setCartProducts}=invoiceSlice.actions;
export default invoiceSlice.reducer;