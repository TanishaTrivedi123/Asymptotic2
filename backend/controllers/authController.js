//signup or login ka logic

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//logic for signup (signup controller)
const signupUser = async (req,res) => {
    try{
        const {username, email, password, confirmPassword} = req.body;

        //Password and confirmPassword match check
        if(password !== confirmPassword){
            return res.status(400).json({message: "Passwords do not match"});
        }

        //check user email is already existed or not
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "Email already registered"});
        }

        //password hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        //save user in database
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        //Auto Login Here(generate token)
        const token = jwt.sign(
            {id:newUser.id},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES_IN}
        );

        //user register ho gaya he 
        res.status(201).json({
            message: "User registered and logged in successfully",
            token,
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email
            }
        });
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            message: "Server error, please try again letter"
        });
    }
}

//logic for login (login controller)
const loginUser = async (req,res) => {
    try{
         const {email, password} = req.body;

    //email exist karta he ya nhi 
    const user = await User.findOne({email});

    if(!user){
        return res.status(400).json({message: "User not found, please signup first"});
    }

    //password check kr rahe he
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(401).json({message: "Invalid Credentials"});
    }

    //generate token 
    const token = jwt.sign(
        {id:user.id},  //payload
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN}
    );

    //email or password match ho gaya means login successful
    res.status(200).json({
        message: "Login successful",
        token,
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
        }
    });
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: "Server error, please try again later"});
    }
}

//controllet to get the user data
const userData = async (req,res) => {
    try{
        const user = await User.findById(req.user.id).select("username email");

        res.status(200).json({message: "User found", success: true, user});
    }
    catch(error){
        res.status(500).json({message: "Server error"})
    }
}

module.exports = { signupUser, loginUser, userData };