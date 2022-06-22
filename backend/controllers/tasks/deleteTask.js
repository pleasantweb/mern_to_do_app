const TodoList = require("../../models/TodoList")

const deleteTask =(req,res)=>{
    const {user,taskId} = req.body
    try{
    TodoList.findOne({user:user}).then(doc=>{
        let item = doc.list.filter(v=>!v._id.equals(taskId))
        // console.log(item)
        doc.list = item
        doc.save()
        res.status(200).json(doc)
    })
   
}catch(err){
    res.status(500).json(err.message)
}
}
module.exports = {deleteTask}