const express = require('express');
const router = express.Router();
// ---------------------------------------------


// Path to handle Static Files with in the router
// ---------------------------------------------
router.use(express.static('public'));

// Create jokeRoutes Server will break until jokeRoutes is created
// ---------------------------------------------
const jokeRoutes = require('./api/jokeRoutes');

// Create path that will point to jokeRoutes
// ---------------------------------------------
router.use('/jokes', jokeRoutes);

// Create Home Route
// ---------------------------------------------
router.get('/', (req, res)=>{
    res.render('pages/home', {
        title: 'My Jokes Website!',
        name: 'Jokes'
    });
});

// Error Route
// ---------------------------------------------
router.get('*', (req, res)=> {
    if(req.url == '/favicon.ico/') {
        res.end();
    } else {
        res.send('<h1>404 this page does not exist</h1>')
    }
});



// ---------------------------------------------
module.exports = router;
