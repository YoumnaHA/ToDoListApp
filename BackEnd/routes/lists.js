// const projectsServices = require("../services/projects");//pour les projects
// const helpers = require("../helpers/helpers");//pour obtenir le base url
const express = require("express");
// const utils = require("./utils");
const router = express.Router();
const auth = require('../middleware/auth')


const listeCtrl = require('../controllers/list')

router.get('/',listeCtrl.getAllLists)
router.post('/create',listeCtrl.createAListe)
router.delete('/delete/:id',listeCtrl.deleteAListe)



module.exports=router

