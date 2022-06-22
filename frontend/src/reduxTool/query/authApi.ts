import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints:(build)=>({
        register: build.mutation({
            query: (body) => ({
              url: "/auth/register",
              method: "POST",
              headers: {
                "Content-Type": "application/json; charset=UTF-8",
              },
              body: body,
              credentials: "include",
            }),
          }),
          activation: build.mutation({
            query: (activationCode) => ({
              url: "/auth/activate",
              method: "POST",
              headers: {
                "Content-Type": "application/json; charset=UTF-8",
              },
              body: { activationCode: activationCode },
              credentials: "include",
            }),
          }),
          login: build.mutation({
            query: (data) => ({
              url: "/auth/login",
              method: "POST",
              headers: {
                "Content-Type": "application/json; charset=UTF-8",
              },
              body: data,
              credentials: "include",
            }),
          }),
    })
})

export const {
    useRegisterMutation,
    useActivationMutation,
    useLoginMutation
} = authApi