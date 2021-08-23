const router = require('express').Router();
const authCtrl = require('../controllers/authControllers');


    router.post('/register', authCtrl.register)
    router.get('/checkemail/:email', authCtrl.isEmailAvailable)
    router.get('/checkusername/:username', authCtrl.isUsernameAvailable)

    router.post('/login', authCtrl.userLogin)

module.exports = router
