const express = require("express");
const router = express.Router();

router.use(require('./userRoute'));
router.use(require('./categoryRoute'));
router.use(require('./serviceRoute'))

module.exports = router;