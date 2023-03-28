const router = require('express').Router();
const { Project, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {

  // is game for testing only. switch back to homepage for production
    res.render('login', {

      logged_in: req.session.logged_in
    });
  });

  router.get('/game', async (req, res) => {

    res.render('game', {

       logged_in: req.session.logged_in
    });
  });

router.get('/user/:email', async (req, res) => {
  try {
    const userData = await User.findOne({where:{email: req.params.email},
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const user = userData.get({ plain: true });

    res.render('game', {
      ...user,
      logged_in: req.session.logged_in
    });
  }
catch(err){
  console.log(err)
}});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/signup', async (req, res) => {
  res.render('signup');
});

module.exports = router;
