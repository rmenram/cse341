const { body, validationResult } = require("express-validator");
const validate = {}

// Movie Validation Rules
validate.movieRules = [
    body("title").notEmpty().withMessage("Movie Title required."), 
    body("year").notEmpty().withMessage("Movie Year required."), 
    body("rated").notEmpty().withMessage("Movie Rated required.") 
];

// Movie Watched Validation Rules
validate.rankRules = [
    body("title").notEmpty().withMessage("Movie Title required."), 
    body("year").notEmpty().withMessage("Movie Year required."), 
    body("rated").notEmpty().withMessage("Movie Rated required."), 
    body('stars').optional({ checkFalsy: true }).isInt({ min: 1, max: 5 }).withMessage('Star must be an integer between 1 and 5.')
];

// A middleware to handle the validation result
validate.handleValidationErrors = (req, res, next) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // If there are errors, return a 400 status with the error details
        return res.status(400).json({ errors: errors.array() });
    }
    next(); // Pass control to the next handler (controller)
};

module.exports = validate
