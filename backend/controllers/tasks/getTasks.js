const TodoList = require("../../models/TodoList")

const getTasks=async(req,res)=>{
    const userId = req.params.userId
    // console.log(userId);
    try{
        const tasks = await TodoList.findOne({user:userId}).exec()
        res.status(200).json(tasks)
    }catch(err){
        res.status(500).json(err.message)
    }
}

module.exports = {getTasks}