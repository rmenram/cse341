const router = require('express').Router();

const usersController = require('../controllers/users');

// GET /feed/posts
router.get('/', usersController.getAll);
// localhost:8080/users/
router.get('/:id', usersController.getSingle);
// localhost:8080/users/

module.exports = router;