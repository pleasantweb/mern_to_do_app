import { createAsyncThunk } from "@reduxjs/toolkit"
import { loginBody } from "../../../types"
import { loginUser, logoutUser, refreshUser, verifyUser } from "./authServices"


export const loginAsync = createAsyncThunk('auth/login',
  async({email,password}:loginBody)=>{
      const res = await loginUser(email,password)
      return res
  }
)

export const verifyAsync= createAsyncThunk('auth/verify',
 async (accessToken:string) => {
     const res = await verifyUser(accessToken)
     return res
 }
)

export const refreshUserAsync = createAsyncThunk('auth/refresh',
   async()=>{
    const res = await refreshUser()
    return res
   }
)

export const logoutUserAsync = createAsyncThunk('auth/logout',
 async () => {
   const res = await logoutUser()
   return res
 }
)