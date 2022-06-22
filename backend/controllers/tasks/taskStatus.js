const TodoList = require("../../models/TodoList")

const taskStatus =(req,res)=>{
    const {user,taskId,status} = req.body
    try{
        TodoList.findOne({user:user}).then(doc=>{
            let item = doc.list.filter(v=>v._id.equals(taskId))
            item[0].status = status
            doc.save()
            res.status(200).json(doc)
        })
        
    }catch(err){
        res.status(500).json(err.message)
    }
}

module.exports = {taskStatus}