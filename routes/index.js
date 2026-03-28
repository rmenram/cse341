const router = require('express').Router();

router.get('/', (req, res) => { 
    // res.send('Welcome to my Movies API');
    const message = "Welcome to my Movies API";
    res.json({ message: message });
});

// router.use('/contacts', require('./contacts'));

// router.use('/users', require('./users'));

// router.use('/professional', require('./professional'));

router.use('/movies', require('./movies'));

router.use('/movies-rank', require('./movies-rank'));

module.exports = router;