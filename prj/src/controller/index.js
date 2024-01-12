const userController = require('./userController');
const categoryController = require('./categoryController');
const serviceController = require('./serviceController')
const controller = {
    userController, 
    categoryController,
    serviceController
}

module.exports = controller