const express = require("express");
const router = express.Router();
const controller = require("../controller/index");
const jwt = require("../services/token")

router.post('/category', jwt.verifyTokenFn, controller.categoryController.addCategory);
router.get('/categories', jwt.verifyTokenFn, controller.categoryController.getCategories);
router.put('/category/:categoryId', jwt.verifyTokenFn, controller.categoryController.updateCategory);
router.delete('/category/:categoryId' , jwt.verifyTokenFn , controller.categoryController.removeEmptyCategory)

module.exports = router;