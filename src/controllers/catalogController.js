const router = require('express').Router();
const catalogService = require('../services/catalogService');
const { isAuth } = require('./../middlewares/authMiddleware');

router.get('/all', async (req, res) => {
  const catalog = await catalogService.getAll().lean();

  res.render('catalog/catalog', { catalog });
});

// Create
router.get('/create', isAuth, async (req, res) => {
  res.render('catalog/create');
});

router.post('/create', async (req, res) => {
  const {
    name,
    type,
    production,
    exploitation,
    damages,
    description,
    image,
    price,
  } = req.body;

  const payload = {
    name,
    type,
    production,
    exploitation,
    damages,
    description,
    image,
    price,
    button: req.user,
  };
  await catalogService.create(payload);
  res.redirect('/catalog/all')
});

router.get('/:catalogId/details', async (req, res) => {
  const { catalogId } = req.params;
  const catalog = await catalogService.singleCatalog(catalogId).lean();

  const { user } = req;
  const { owner } = catalog;
  const isOwner = user?._id === owner;

  res.render('catalog/details', { catalog, isOwner });
});

// Edit
router.get('/:catalogId/edit', async (req, res) => {
  const { catalogId } = req.params;

  const catalog = await catalogService.singleCatalog(catalogId).lean();
  res.render('catalog/edit', { catalog });
});

router.post('/:catalogId/edit', async (req, res) => {
  const { catalogId } = req.params;

  const {
    name,
    type,
    production,
    exploitation,
    damages,
    description,
    image,
    price,
  } = req.body;

  const payload = {
    name,
    type,
    production,
    exploitation,
    damages,
    description,
    image,
    price,
    button: req.user,
  };

  await catalogService.update(catalogId, payload);
  res.redirect(`/catalog/${catalogId}/details`);
});

// Delete
router.get('/:catalogId/delete', async (req, res) => {
  const { catalogId } = req.params;

  await catalogService.delete(catalogId);
  res.redirect('/catalog/all');
});

// Search
router.get('/search', isAuth, async (req, res) => {
  res.render('catalog/search');
});

module.exports = router;