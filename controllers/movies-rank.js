const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
	try {
	  const result = await mongodb.getDatabase().db('project01').collection('movies_rank').find();
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
		const movieId = new ObjectId(req.params.id);
		const result = await mongodb.getDatabase().db('project01').collection('movies_rank').find({_id: movieId});
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

const createMovie = async (req, res) => {
  try {
    const movie = {
      title: req.body.title,
      year: req.body.year,
      rated: req.body.rated,
      stars: req.body.stars
    };

    // 2. Insert with appropriate collection name
    const response = await mongodb.getDatabase().db('project01').collection('movies_rank').insertOne(movie);

    // 3. Proper Response Handling
    if (response.acknowledged) {
      // 201 Created is better than 204
      res.status(201).json({ id: response.insertedId });
    } else {
      res.status(500).json({ message: 'Failed to create movie watched/rank.' });
    }
  } catch (error) {
    // 4. Catch errors (e.g., db connection issues)
    console.error('Error creating movie watched/rank:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateMovie = async (req, res) => {
  const movieId = new ObjectId(req.params.id);
  const movie = {
    title: req.body.title,
    year: req.body.year,
    rated: req.body.rated,
    stars: req.body.stars
  };
  const response = await mongodb.getDatabase().db('project01').collection('movies_rank').replaceOne({ _id: movieId }, movie);
    if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the movie watched/rank.');
  }
};

const deleteMovie = async (req, res) => {
  const movieId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().db('project01').collection('movies_rank').deleteOne({ _id: movieId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the movie watched/rank.');
  }
};

module.exports = { getAll, getSingle, createMovie, updateMovie, deleteMovie };