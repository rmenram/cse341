const rankController = require('../controllers/movies-rank');
const rankValidate = require('../utilities/movie-validation');
const { isAuthenticated } = require('../utilities/authenticate');

const router = require('express').Router();

// GET /feed/posts
// localhost:8080/movies-rank/
router.get('/', rankController.getAll);

router.get('/:id', rankController.getSingle);

// Route definition with validation middleware and error handler
router.post('/', isAuthenticated, rankValidate.rankRules, rankValidate.handleValidationErrors, rankController.createMovie);

router.put('/:id', isAuthenticated, rankController.updateMovie);

router.delete('/:id', isAuthenticated, rankController.deleteMovie);

module.exports = router;