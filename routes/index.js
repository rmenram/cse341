const router = require('express').Router();

router.get('/', (req, res) => { 
    res.send('Welcome to my Contacts API');
});

router.use('/contacts', require('./contacts'));

// router.use('/users', require('./users'));

// router.use('/professional', require('./professional'));

module.exports = router;