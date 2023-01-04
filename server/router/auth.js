let express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
    res.send('hit at from auth.js');
});

router.get('/register', (req, res) => {
    console.log(req.body);      // Here logging request body
    res.json({      // Setting same as msg. But it responded this. Why ?
        msg: req.body
    });
});

module.exports = router;