import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
const { REACT_APP_BACKEND_URL } = process.env;

export const baseApi = createApi({
    reducerPath:'blogApi',
    baseQuery:fetchBaseQuery({baseUrl:`${REACT_APP_BACKEND_URL}`}),
    endpoints:()=>({}),
    tagTypes:['allTasks']
})