var express = require('express');
var router = express.Router();
var sendEmailCtrl = require('../controllers/sendEmailCtrl');

router.post('/invite-to-chat', sendEmailCtrl.inviteToChat)

module.exports = router;
