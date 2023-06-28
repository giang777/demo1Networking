const express = require("express");
const router = express.Router();

const userCTL = require("../controller/user.controller");

router.get('/list',userCTL.listUser);
router.post('/add',userCTL.addUser);
router.delete('/delete/:id',userCTL.deleteUser)
router.patch('/update/:id',userCTL.updateUser)

router.get('/listRole',userCTL.listRole);
router.post('/addRole',userCTL.addRole);
router.delete('/deleteRole/:id',userCTL.deleteRole)
router.patch('/updateRole/:id',userCTL.updateRole)
module.exports = router;