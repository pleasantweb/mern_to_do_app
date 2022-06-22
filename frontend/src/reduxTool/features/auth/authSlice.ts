import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginAsync, logoutUserAsync, refreshUserAsync, verifyAsync } from "./authAsync";

const initialState={
    accessToken:'',
    userId:'',
    user:'',
    email:'',
    isAuthenticated:false
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        
    },
    extraReducers:(builder)=>{
        builder.addCase(loginAsync.fulfilled,(state,action:PayloadAction<{accessToken:string}|null>)=>{
            if(action.payload){
                state.accessToken = action.payload.accessToken
            }
            
            
        })
        .addCase(verifyAsync.fulfilled,(state,action)=>{
            // console.log(action.payload);
            if(action.payload){
                state.isAuthenticated = true
                state.userId = action.payload.userId
                state.user=action.payload.user
                state.email = action.payload.email
            }
            
        })
        .addCase(refreshUserAsync.fulfilled,(state,action:PayloadAction<{accessToken:string}|null>)=>{
            if(action.payload){
                state.accessToken = action.payload.accessToken
            }
        })
        .addCase(logoutUserAsync.fulfilled,(state,action)=>{
            if(action.payload){
                state.isAuthenticated = false
                state.accessToken = ''
                state.email = ''
                state.user = ''
            }
        })
    }
})
// export const {} = authSlice.actions
export default authSlice.reducer