let express = require('express');
let router = express.Router();
let User = require('../datamodel/userSchema');

router.get('/', (req, res) => {
    res.send('hit at from auth.js');
});

// Below implementation is using promises
// router.post('/register', (req, res) => {
//     const {name, email, phone, password, cpassword} = req.body;

//     if(!name || !email || !phone || !password || !cpassword){
//         // Writing return here is important, else it would try to send responce, when its already sent.
//         return res.status(422).json({      // Setting same as msg. But it responded this. Why ?
//             error: "Send all required fields"
//         });
//     }

//     User.findOne({email: email }).then((userExist) => {
//         if(userExist){
//             return res.status(422).json({ error: "Email already exists" });
//         }
//         const user = new User({name, email, phone, password, cpassword });

//         user.save().then(()=>{
//             res.status(201).json({ message: "User registed successfully"});
//         }).catch((err)=>{
//             res.status(500).json({ error: "Failed to register" });
//         });
//     }).catch((err)=>{
//         console.log(err);
//     });

// });

// Now by using async

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

module.exports = router;