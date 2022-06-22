import React, { useState } from "react";
import { useAppSelector } from "../reduxTool/app/hooks";
import {  useGetTasksQuery } from "../reduxTool/query/taskApi";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
// import _ from 'lodash/debounce'


export type editTask={
  taskId:string,
  task:string
}

const Tasks = () => {
  const [editTask,setEditTask] = useState<editTask>({
    taskId:'',
    task:''
  })
  const [sortBy,setSortBy] = useState('alphabet')
  const [searchStr,setSearchStr] = useState('')

  const {task} = editTask
  const userId = useAppSelector(state=>state.auth.userId)
  const accessToken=useAppSelector(state=>state.auth.accessToken)
  const {data} =useGetTasksQuery({userId,accessToken})
 
// console.log(data);

const onSortChange=(e:React.ChangeEvent<HTMLSelectElement>)=>{
  setSortBy(e.target.value)
}
// const handleSearch=(e:React.ChangeEvent<HTMLInputElement>)=>{
//    _(function(){
//       setSearchStr(e.target.value)
//    },1000)
// }


  return (
    <section className="taskSection">
        <AddTask 
              userId={userId} 
              accessToken={accessToken} 
              editTask={task !== '' ? editTask : null}
              setEditTask={setEditTask}
              />
        <div className="taskLists">
            <div className="search">
                <div className="inpSearch">
            <input type="text" placeholder="Search here..." value={searchStr} onChange={e=>setSearchStr(e.target.value)} />
            

            <select name="" onChange={onSortChange} value={sortBy}>
              <option value="sort_by" disabled>Sort By</option>
              <option value="alphabet">Alphabet</option>
              <option value="latest">Latest</option>
              <option value="old">Oldest</option>
            </select>

            </div>
            </div>
            

          <ul>
           <TaskList data={data ? data: null}
                     userId={userId}
                      accessToken={accessToken} 
                      setEditTask={setEditTask}
                      sortBy={sortBy}
                      searchStr={searchStr}
                      />
           
          </ul>
        </div>
      </section>
  )
}

export default Tasks