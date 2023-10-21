const router = require('express').Router();
const userService = require('../services/userService');
const { extractErrorMsgs } = require('./../utils/errorHandler');
const { isAuth } = require('./../middlewares/authMiddleware');



// Register
router.get('/register', (req, res) => {
  res.render('user/register');
});

router.post('/register', async (req, res) => {
  const { email, userName, password, rePassword } = req.body;

  try {
    await userService.register({ email, userName, password, rePassword });

    res.redirect('/users/login');
  } catch (error) {
    const errorMessages = extractErrorMsgs(error);
    res.status(404).render('user/register', { errorMessages });
  }
});

// Login
router.get('/login', (req, res) => {
  res.render('user/login');
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await userService.login(email, password);

    res.cookie('token', token, { httpOnly: true })
    res.redirect('/');
  } catch (error) {
    const errorMessages = extractErrorMsgs(error);
    res.status(404).render('user/login', { errorMessages })
  }
});

// Logout
router.get('/logout', isAuth, (req, res) => {
  res.clearCookie('token');
  res.redirect('/')
})



module.exports = router;
