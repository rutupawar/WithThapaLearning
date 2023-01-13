let express = require('express');
let router = express.Router();
let User = require('../datamodel/userSchema');

router.get('/', (req, res) => {
    res.send('hit at from auth.js');
});

router.get('/register', (req, res) => {
    const {name, email, phone, password, cpassword} = req.body;

    if(!name || !email || !phone || !password || !cpassword){
        // Writing return here is important, else it would try to send responce, when its already sent.
        return res.status(422).json({      // Setting same as msg. But it responded this. Why ?
            error: "Send all required fields"
        });
    }

    User.findOne({email: email }).then((userExist) => {
        if(userExist){
            // Return here is important
            return res.status(422).json({ error: "Email already exists" });
        }
        const user = new User({name, email, phone, password, cpassword });

        user.save().then(()=>{
            res.status(201).json({ message: "User registed successfully"});
        }).catch((err)=>{
            res.status(500).json({ error: "Failed to register" });
        });
    }).catch((err)=>{
        console.log(err);
    });

});

module.exports = router;