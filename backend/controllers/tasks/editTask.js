const TodoList = require("../../models/TodoList")

const editTask = (req,res)=>{
    const {user,taskId,task} = req.body
    try{
   
     TodoList.findOne({user:user}).then(doc=>{
        let item = doc.list.filter(v=>v._id.equals(taskId))
        item[0].task = task
        doc.save()
        // console.log(item);
        // console.log(doc)
        res.status(200).json(doc)
     })

   
    }catch(err){
        res.status(500).json(err.message)
    }
}
module.exports = {editTask}