const router = require('express').Router()
const {createTask} = require('../controllers/tasks/createTaks')
const {editTask} = require('../controllers/tasks/editTask')
const {deleteTask} = require('../controllers/tasks/deleteTask')
const {getTasks} = require('../controllers/tasks/getTasks')
const {checkAuth} = require('../middleware/checkAuth')
const {taskStatus} =  require('../controllers/tasks/taskStatus')


router.get('/gettask/:userId',checkAuth,getTasks)
router.post('/addtask',checkAuth,createTask)
router.put('/edittask',checkAuth,editTask)
router.delete('/deletetask',checkAuth,deleteTask)

router.put('/taskstatus',checkAuth,taskStatus)

module.exports = router