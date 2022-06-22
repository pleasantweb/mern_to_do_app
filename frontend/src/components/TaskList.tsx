import { useEffect, useState } from "react";
import { AiFillDelete,AiOutlineEdit } from "react-icons/ai";
import {  useDeleteTaskMutation, useTaskStatusMutation } from "../reduxTool/query/taskApi";
import { taskObj, userTasks } from '../types'
import { editTask } from "./Tasks";

type propType={
    data:userTasks |null,
    userId:string,
    accessToken:string,
    setEditTask:React.Dispatch<React.SetStateAction<editTask>>,
    sortBy:string,
    searchStr:string
}

const TaskList = (props:propType) => {
    
    const [task,setTask] = useState<taskObj[]>([])

    const {data,userId,accessToken,setEditTask,sortBy,searchStr} = props
    const [deleteTask,res] = useDeleteTaskMutation()
    const [taskStatus,resp] = useTaskStatusMutation()
    
const handleEditTask=(taskId:string,task:string)=>{
    setEditTask({
      taskId:taskId,
      task:task
    })
}

const handleDeleteTask=async(taskId:string)=>{
const body = {user:userId,taskId}
 await deleteTask({body,accessToken})
}

const onTaskStatus=async(e:React.ChangeEvent<HTMLInputElement>,taskId:string)=>{
// console.log(e.target.checked);
let status = e.target.checked ? 'finished':'pending'
let body = {user:userId,taskId,status}
await taskStatus({body,accessToken})


}


useEffect(()=>{
  if(data){
    setTask(data.list)

  }
},[data])

useEffect(()=>{
  if(searchStr !== ''){
    if(data){
   setTask(prev=>(
    [...data.list.filter(v=>v.task.search(searchStr) > -1)]
   ))
    }
   
  }
},[searchStr,data])
// console.log(task);


return (
    <>
     {data ? (
     [...task].sort((a,b)=>
       sortBy === 'alphabet' ? (
        a.task.toLowerCase()
        .localeCompare(b.task.toLowerCase())
       ): sortBy === 'latest' ?
        new Date(b.date).getTime() - new Date(a.date).getTime() 
        : new Date(a.date).getTime() - new Date(b.date).getTime() 
      )
      .map((v,i)=>(
                <li key={v._id}>
                <div className="task">
                    <input checked={v.status === 'finished' ? true:false} type="checkbox" name="" onChange={e=>onTaskStatus(e,v._id)}  />
                <p>{v.task}</p>
                </div>
              <div className="action">
                <AiOutlineEdit onClick={()=>handleEditTask(v._id,v.task)} />
                <AiFillDelete onClick={()=>handleDeleteTask(v._id)} />
              </div>
              
            </li>
              ))
             
            ):""}
    </>
  )
}

export default TaskList