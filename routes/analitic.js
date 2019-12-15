const express = require('express');
const passport = require('passport');
const controller = require('../controllers/analitic')
const router = express.Router();

router.get('/overview',passport.authenticate('jwt', {session:false}), controller.overview);
router.get('/analitic',passport.authenticate('jwt', {session:false}), controller.analitic);
module.exports =  router;