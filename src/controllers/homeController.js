const router = require('express').Router();
const catalogService = require('../services/catalogService');


router.get('/', (req, res) => {
  const { name, type } = req.query;
  const search = catalogService.getAll();
  res.render('home', { name, type });
});

router.get('/404', (req, res) => {
  res.render('404');
});

module.exports = router;
