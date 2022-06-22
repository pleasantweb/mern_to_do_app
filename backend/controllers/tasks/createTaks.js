const TodoList = require("../../models/TodoList")

const createTask = async(req,res)=>{
    const {user,task} = req.body
    // console.log(user,task);
    try{
        const findUser = await TodoList.findOne({user:user}).exec()
        if(!findUser){
        const newTask = await TodoList.create({
            user:user,
            list:[{task:task}]
                
        })
       return res.status(201).json(newTask)
    }else{
        findUser.list.push({task:task})
        const addedTask =await findUser.save()
        return res.status(201).json(addedTask)
    }
    }catch(err){
        res.status(500).json(err.message)
    }
}

module.exports = {createTask}