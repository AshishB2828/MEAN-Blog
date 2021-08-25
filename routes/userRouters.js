const userCtrl = require('../controllers/userControllers');
const auth = require('../middlewares/auth');

const router = require('express').Router();


    router.get('/profile',auth,  userCtrl.getProfile )
    router.get('/profile/:id',  userCtrl.getProfile )
module.exports =router