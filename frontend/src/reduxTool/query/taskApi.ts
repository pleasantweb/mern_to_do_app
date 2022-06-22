import { userTasks } from "../../types";
import { baseApi } from "./baseApi";

const taskApi = baseApi.injectEndpoints({
    endpoints:(build)=>({
        getTasks:build.query<userTasks,{userId:string,accessToken:string}>({
            query:({userId,accessToken})=>({
              url:`/task/gettask/${userId}`,
              method:"GET",
              credentials:"include",
              headers: {
                "Authorization": `Bearer ${accessToken}`,
              },
            }),
            providesTags:['allTasks']
            
        }),
        addTask:build.mutation({
            query:({body,accessToken})=>({
                url:'/task/addtask',
                method:"POST",
                credentials:'include',
                headers: {
                    'Content-Type':'application/json; charset=UTF-8',
                    "Authorization": `Bearer ${accessToken}`,
                  },
                body:body
            }),
            invalidatesTags:['allTasks']
        }),
        deleteTask:build.mutation({
            query:({body,accessToken})=>({
                url:'/task/deletetask',
                method:"DELETE",
                credentials:"include",
                headers: {
                    'Content-Type':'application/json; charset=UTF-8',
                    "Authorization": `Bearer ${accessToken}`,
                  },
                body:body
            }),
            invalidatesTags:['allTasks']
        }),
        editTask:build.mutation({
            query:({body,accessToken})=>({
                url:'/task/edittask',
                method:"PUT",
                credentials:"include",
                headers: {
                    'Content-Type':'application/json; charset=UTF-8',
                    "Authorization": `Bearer ${accessToken}`,
                  },
                body:body
            }),
            invalidatesTags:['allTasks']
        }),
        taskStatus:build.mutation({
            query:({body,accessToken})=>({
                url:'/task/taskstatus',
                method:"PUT",
                credentials:'include',
                headers: {
                    'Content-Type':'application/json; charset=UTF-8',
                    "Authorization": `Bearer ${accessToken}`,
                  },
                body:body
            }),
            invalidatesTags:['allTasks']
        })
    })
})

export const {
    useGetTasksQuery,
    useAddTaskMutation,
    useDeleteTaskMutation,
    useEditTaskMutation,
    useTaskStatusMutation
} = taskApi