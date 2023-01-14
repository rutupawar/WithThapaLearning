let express = require('express');
let router = express.Router();
let User = require('../datamodel/userSchema');

router.get('/', (req, res) => {
    res.send('hit at from auth.js');
});

router.post('/register', async (req, res) => {
    const {name, email, phone, password, cpassword} = req.body;

    if(!name || !email || !phone || !password || !cpassword){
        return res.status(422).json({
            error: "Send all required fields"
        });
    }

    try{
        const userExist = await User.findOne({email: email });
        if(userExist){
            return res.status(422).json({ error: "Email already exists" });
        }

        const user = new User({name, email, phone, password, cpassword });
        await user.save();

        res.status(201).json({ message: "User registed successfully" });

    } catch ( err ) {
        console.log(err);
    }
});

router.post('/signin', async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({"error": "Fill all fields"});
    }

    try{
        const userLogin = await User.findOne({ email: email});
        console.log(userLogin);
        if(userLogin){
            res.json({"success": "Login done"});
        }
        else{
            res.json({"fail": "Login failed"});
        }
        // res.json({"succes1s": "Login done"});        // res.json sends responce directly
    }
    catch{
        console.log(err);
    }
})

module.exports = router;