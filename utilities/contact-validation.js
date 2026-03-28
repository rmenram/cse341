const { body, validationResult } = require("express-validator");
const validate = {}

// Contact Validation Rules
validate.contactRules = [
    // firstname is required and must be string
    body("firstName")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please provide a first name."), // on error this message is sent.
  
    // lastname is required and must be string
    body("lastName")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Please provide a last name."), // on error this message is sent.
  
    // valid email is required 
    body("email")
        .trim()
        .escape()
        .notEmpty()
        .isEmail()
        .normalizeEmail() // refer to validator.js docs
        .withMessage("A valid email is required."),
  
    // color is required and must be string
    body("favoriteColor")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 3 })
        .withMessage("Please provide a color."), // on error this message is sent.

    // birthday is required and must be string
    body("birthday")
        .trim()
        .notEmpty()
        .isLength({ min: 4 })
        .withMessage("Please provide a birthday.") // on error this message is sent.
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
