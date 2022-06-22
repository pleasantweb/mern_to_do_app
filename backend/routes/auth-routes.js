const router = require('express').Router()
const {handleRegister} = require('../controllers/auth/registerController')
const {handleActivation} = require('../controllers/auth/activationController')
const {resendActiveCode} = require('../controllers/auth/resendActiveCodeController')
const {handleLogin} = require('../controllers/auth/authController')
const {handleLogout} = require('../controllers/auth/logoutController')
const {handleRefreshToken} = require('../controllers/auth/refreshTokenController')
const {verifyUser} = require('../controllers/auth/verifyUserController')


router.post('/register',handleRegister)
router.post('/activate',handleActivation)
router.get('/resendcode',resendActiveCode)

router.post('/login',handleLogin)
router.get('/logout',handleLogout)
router.get('/refresh',handleRefreshToken)

router.get('/verify',verifyUser)


module.exports = router