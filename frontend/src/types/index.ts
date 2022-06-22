export type loginBody = {
    email:string,
    password:string
}

export type userBody ={
    userId:string,
    user:string,
    email:string
}
export type taskObj = {
    _id:string,
    task:string,
    date:Date,
    status:'pending' | 'finished'
}
export type userTasks = {
    _id:string,
    user:string,
    list:taskObj[]
}