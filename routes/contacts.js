const router = require('express').Router();

const contactsController = require('../controllers/contacts');

// GET /feed/posts
router.get('/', contactsController.getAll);
// localhost:8080/contacts/
router.get('/:id', contactsController.getSingle);
// localhost:8080/contacts/

module.exports = router;