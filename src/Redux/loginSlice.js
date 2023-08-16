import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    admin: []
}

const adminSlice = createSlice({
    name:'admin',
    initialState,
    reducers:{
        setAuthenticated: (state,action) =>{
            state.isAuthenticated = action.payload;
        },
        setAdmin: (state,action) =>{
            state.admin = action.payload;
        }
    }
})

export const { setAuthenticated, setAdmin } = adminSlice.actions;
export default adminSlice.reducer