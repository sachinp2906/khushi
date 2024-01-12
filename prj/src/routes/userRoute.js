const express = require("express");
const router = express.Router();
const controller = require("../controller/index");

router.post('/user/signup', controller.userController.signup);
router.post('/user/login', controller.userController.login);
module.exports = router;