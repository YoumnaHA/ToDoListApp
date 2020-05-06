const express = require("express");
// const utils = require("./utils");
const router = express.Router();
const auth = require('../middleware/auth')


const stepCtrl = require('../controllers/step')

router.get('/:id',stepCtrl.getAllsteps)
// router.get('/:id',stepCtrl.getListTasks)
router.post('/create',stepCtrl.createAStep)
router.delete('/delete/:id',stepCtrl.deleteAStep)
router.put('/update/:id',stepCtrl.updateAStep)

module.exports=router
