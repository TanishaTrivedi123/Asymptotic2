const validateSignup = (req, res, next) => {
    const {username, email, password} = req.body;

    // Step 1: Check all fields present hain ya nahi
    if(!username || !email || !password){
        return res.status(400).json({message: "All fields are required"});
    }

    // Step 2: Email validation (regex pattern check)
    const emailRegex = /^\S+@\S+\.\S+$/;
    if(!emailRegex.test(email)){
        return res.status(400).json({message: "Please enter a valid email"});
    }

    // Step 3: Password validation (minimum 12 characters)
    if(password.length < 12){
        return res.status(400).json({message: "Password must be atleast 12 characters long"})
    }

    next();  //sab kuch sahi he to aage jaao controller pr (database me save karo aage jaakr)
}

module.exports = validateSignup;