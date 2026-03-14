const router = require('express').Router();

const contactsController = require('../controllers/contacts');

// GET /feed/posts
router.get('/', contactsController.getAll);
// localhost:8080/contacts/
router.get('/:id', contactsController.getSingle);
// localhost:8080/contacts/
router.post('/', contactsController.createContact);

router.put('/:id', contactsController.updateContact);

router.delete('/:id', contactsController.deleteContact);

module.exports = router;