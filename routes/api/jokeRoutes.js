const express = require('express');
const router = express.Router();

// Fetch
// ---------------------------------------------
const fetch = (...args)=> import('node-fetch').then(({default: fetch}) => fetch(...args));

// Create Counter
// ---------------------------------------------
let count;

// Fetch Our URL from Sample API's
// ---------------------------------------------
fetch('https://api.sampleapis.com/jokes/goodJokes')
    .then(res => res.json())
    .then(data => count = data.length)

// Create path for our Jokes Page
// ---------------------------------------------
router.get('/', (req, res)=> {
    const url = 'https://api.sampleapis.com/jokes/goodJokes'

    fetch(url)
        .then(res => res.json())
        .then(data => {
            res.render('pages/jokes', {
                title: 'All Jokes',
                name: 'All Jokes',
                data
            })
        })
});

// In the Online API there is a type category. We will add a path
// Adding type path => localhost:3000/type/:type
// ---------------------------------------------
router.get('/type/:type', (req, res)=>{
    const type = req.params.type
    const url = 'https://api.sampleapis.com/jokes/goodJokes'

    fetch(url)
        .then(res=> res.json())
        .then(data => {
            // Create an Arry for the item types
            const typeArr = []
            // push type items into the empty typeArr
            data.forEach(item => {
                if(item.type == type) {
                    typeArr.push(item)
                }
            })

            return typeArr
        })
        // Grouping all the jokes by type
        .then(typeArr => {
            res.render('pages/jokes', {
                title: type,
                name: `${type} jokes`,
                data: typeArr
            })
        })
})

// jokes_single page
// localhost:3000/jokes/:id
// ---------------------------------------------
router.get('/:id', (req, res)=> {
    const id = req.params.id
    const url = `https://api.sampleapis.com/jokes/goodJokes/${id}`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            res.render('pages/joke_single', {
                title: `${data.setup}`,
                name: `${data.setup}`,
                data,
                count
            })
        })
})

// Will get an ERROR at localhost:3000 until pages are created

// Export Router
// ---------------------------------------------
module.exports = router;