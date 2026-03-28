const rankController = require('../controllers/movies-rank');
const rankValidate = require('../utilities/movie-validation');

const router = require('express').Router();

// GET /feed/posts
// localhost:8080/movies-rank/
router.get('/', rankController.getAll);

router.get('/:id', rankController.getSingle);

// Route definition with validation middleware and error handler
router.post('/', rankValidate.rankRules, rankValidate.handleValidationErrors, rankController.createMovie);

router.put('/:id', rankController.updateMovie);

router.delete('/:id', rankController.deleteMovie);

module.exports = router;