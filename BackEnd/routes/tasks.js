const express = require("express");
// const utils = require("./utils");
const router = express.Router();
const auth = require('../middleware/auth')


const taskCtrl = require('../controllers/task')

router.get('/',taskCtrl.getAlltasks)
// router.get('/:id',taskCtrl.getListTasks)
router.post('/create',taskCtrl.createATask)
router.delete('/delete/:id',taskCtrl.deleteATask)
router.put('/update/:id',taskCtrl.updateATask)

module.exports=router

