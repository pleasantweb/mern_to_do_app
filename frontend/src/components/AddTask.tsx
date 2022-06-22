import React, { useEffect, useState } from 'react'
import { useAddTaskMutation, useEditTaskMutation } from '../reduxTool/query/taskApi'
import { editTask } from './Tasks'

type PropType={
    userId:string,
    accessToken:string,
    editTask:{
        taskId:string,
        task:string
    } | null,
    setEditTask:React.Dispatch<React.SetStateAction<editTask>>
}

const AddTask = (props:PropType) => {
    const {userId,accessToken,editTask,setEditTask} = props
    const [task,setTask] = useState('')
    
    const [addTask,res] = useAddTaskMutation()
    const [edit_Task,resp] = useEditTaskMutation()

    useEffect(()=>{
        if(editTask){
            setTask(editTask.task)
        }
    },[editTask])


const onCancelEdit=()=>{
   setEditTask({
    taskId:'',
    task:''
   })
   setTask('')
}

    const onSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(!editTask){
        let body={user:userId,task}
           await addTask({body,accessToken})
           setTask('')
        }else{
          let body = {user:userId,taskId:editTask.taskId,task}
            await edit_Task({body,accessToken})
            setTask('')
            setEditTask({
                taskId:'',
                task:''
               })
        }
    }
  return (
    <form action="" onSubmit={onSubmit}>
          <input type="text" onChange={e=>setTask(e.target.value)} value={task} />
          <input  type="submit" value={editTask ? 'Edit Task':'New Task'} />
          {editTask ? (
            <button onClick={onCancelEdit}>Cancel</button>
          ):''}
        </form>
  )
}

export default AddTask