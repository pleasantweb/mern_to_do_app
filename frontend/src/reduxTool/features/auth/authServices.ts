import {  userBody } from "../../../types";

const { REACT_APP_BACKEND_URL } = process.env;


export const loginUser =async (email:string,password:string) => {
    // console.log('check',email,password);
    
    const body = JSON.stringify({email,password})
    const res = await fetch(`${REACT_APP_BACKEND_URL}/auth/login`,{
        method:"POST",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        body: body,
        credentials:'include'
    })
    const data:{accessToken:string}= await res.json()
    // console.log(data);
    
  
    if(res.status === 200){
        return data
    }else{
        return null
    }
    
    
}


export const verifyUser =async (accessToken:string) => {
    // console.log('hai ya nahi',accessToken);
    
    const res = await fetch(`${REACT_APP_BACKEND_URL}/auth/verify`,{
        method:"GET",
        headers:{
            'authorization':`Bearer ${accessToken}` 
        },
        credentials:'include'
    })
    const data:userBody = await res.json()
    // console.log(data);
    if(data){
        return data
    }else{
        return null
    }
    
}

export const refreshUser =async () => {
    const res = await fetch(`${REACT_APP_BACKEND_URL}/auth/refresh`,{
        method:"GET",
        credentials:'include'
    })
    const data:{accessToken:string} =await res.json()
    if(data){
        return data
    }else{
        return null
    }
}

export const logoutUser =async () => {
    const res = await fetch(`${REACT_APP_BACKEND_URL}/auth/logout`,{
        method:"GET",
        credentials:"include"
    })
    // console.log('logout res',res);
    
    if(res.status === 204){
        return true
    }else{
        return false
    }
}