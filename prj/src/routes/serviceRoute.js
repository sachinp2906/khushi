const express = require("express");
const router = express.Router();
const controller = require("../controller/index");
const jwt = require("../services/token")

router.post('/category/:categoryId/service', jwt.verifyTokenFn, controller.serviceController.addService);
router.get('/category/:categoryId/service', jwt.verifyTokenFn, controller.serviceController.getServicesInCategory);
router.delete('/category/:categoryId/service/:serviceId', jwt.verifyTokenFn, controller.serviceController.removeServiceFromCategory);
router.put('/category/:categoryId/service/:serviceId', jwt.verifyTokenFn, controller.serviceController.updateService);

module.exports = router; 