const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const { validationResult } = require('express-validator');

const getAll = async (req, res, next) => {
	try {
	  const result = await mongodb.getDatabase().db('project01').collection('contacts').find();
	  result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
	  }).catch(err => {
      console.error("An error occurred:", err);
      res.status(400).json({ message: err });
	  });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const getSingle = async (req, res, next) => {
	try {
		const userId = new ObjectId(req.params.id);
		const result = await mongodb.getDatabase().db('project01').collection('contacts').find({_id: userId});
		result.toArray().then((lists) => {
		  res.setHeader('Content-Type', 'application/json');
		  res.status(200).json(lists[0]); // we just need the first one (the only one)
		}).catch(err => {
		console.error("An error occurred:", err);
		res.status(400).json({ message: err });
		});
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// controllers/contactsController.js
const createContact = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // If errors exist, return a 400 Bad Request response with the errors
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  try {
    //Basic Input Validation
    const { firstName, lastName, email } = req.body;
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ message: 'Required fields (firstName, lastName, email) cannot be empty.' });
    }

    const user = {
      firstName,
      lastName,
      email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    // 2. Insert with appropriate collection name
    const response = await mongodb.getDatabase().db('project01').collection('contacts').insertOne(user);

    // 3. Proper Response Handling
    if (response.acknowledged) {
      // 201 Created is better than 204
      res.status(201).json({ id: response.insertedId });
    } else {
      res.status(500).json({ message: 'Failed to create contact.' });
    }
  } catch (error) {
    // 4. Catch errors (e.g., db connection issues)
    console.error('Error creating contact:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const createContact1 = async (req, res) => {
  try {
    //Basic Input Validation
    const { firstName, lastName, email } = req.body;
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ message: 'Required fields (firstName, lastName, email) cannot be empty.' });
    }

    const user = {
      firstName,
      lastName,
      email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    // 2. Insert with appropriate collection name
    const response = await mongodb.getDatabase().db('project01').collection('contacts').insertOne(user);

    // 3. Proper Response Handling
    if (response.acknowledged) {
      // 201 Created is better than 204
      res.status(201).json({ id: response.insertedId });
    } else {
      res.status(500).json({ message: 'Failed to create contact.' });
    }
  } catch (error) {
    // 4. Catch errors (e.g., db connection issues)
    console.error('Error creating contact:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb.getDatabase().db('project01').collection('contacts').replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the contact.');
  }
};

const deleteContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().db('project01').collection('contacts').deleteOne({ _id: userId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
};

module.exports = { getAll, getSingle, createContact, updateContact, deleteContact, createContact1 };