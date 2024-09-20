const express = require('express')
const router = express.Router();
const controllers = require('../userController/controller')

router.post('/create',controllers.create)
router.get('/getdata',controllers.getdata)
router.get('/singledata/:id',controllers.getsingledata)
router.put('/updatedata/:id',controllers.updatedata);
router.delete('/deletedata/:id',controllers.deletedata);
module.exports = router