import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface Login{
    email:any,
    password:any,
    submit:boolean,
}

const initialState:Login={
    email:"",
    password:"",
    submit:false,
}

const LoginReducer=createSlice({
    name:'LoginReducer',
    initialState,
    reducers:{
        setEmail:(state,action:PayloadAction<any>)=>{
            return{
                ...state,
                email:action.payload,

            };
        },
        setPassword:(state,action:PayloadAction<any>)=>{
            return{
                ...state,
                password:action.payload,

            };
        },
        setSubmit:(state,action:PayloadAction<boolean>)=>{
            return{
                ...state,
                submit:action.payload,

            };
        },
    }
})
export const {setEmail,setPassword,setSubmit}=LoginReducer.actions;
export default LoginReducer.reducer;