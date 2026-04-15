const validateLogin = (req, res, next) => {
    const {email, password} = req.body;

    // Step 1: Check all fields present hain ya nahi
    if(!email || !password){
        return res.status(400).json({message: "All fields are required"});
    }

    // Step 2: Email validation (regex pattern check)
    const emailRegex = /^\S+@\S+\.\S+$/;
    if(!emailRegex.test(email)){
        return res.status(400).json({message: "Please enter a valid email"});
    }

    next();  //sab kuch sahi he to aage jaao controller pr (database me save karo aage jaakr)
}

module.exports = validateLogin;