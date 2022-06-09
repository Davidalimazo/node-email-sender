const express = require('express');
const { getComrades, insertComrade, deleteComrade } = require('../controller/controller');
const router = express.Router();

router.get('/comrades', getComrades);
router.post('/join', insertComrade);
router.delete('/delete', deleteComrade);


module.exports = router;