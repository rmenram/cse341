const express = require('express');
const { body } = require('express-validator');
const contactsController = require('../controllers/contacts');
const contactValidate = require('../utilities/contact-validation');

const router = require('express').Router();

// Validation middleware definition
const createContactValidation = [
  body('firstName')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string')
    .trim()
];


// GET /feed/posts
router.get('/', contactsController.getAll);
// localhost:8080/contacts/
router.get('/:id', contactsController.getSingle);

// router.post('/', contactsController.createContact);

// router.post('/', createContactValidation, contactsController.createContact); // this one works

// router.post('/', contactValidate.contactRules, contactsController.createContact);  // this one works too

// Route definition with validation middleware and error handler
router.post(
    "/",
    contactValidate.contactRules,
    contactValidate.handleValidationErrors,
    contactsController.createContact1
);

router.put('/:id', contactsController.updateContact);

router.delete('/:id', contactsController.deleteContact);

module.exports = router;