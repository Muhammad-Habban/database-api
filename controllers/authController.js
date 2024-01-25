const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createNewUser = async(req, res) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password)
    {
        return res.status(401).json({message: "Please provide all information"});
    }
    const dupUser = await User.findOne({email});
    if(dupUser)
    {
        return res.status(401).json({message: "User with this email already exists"});
    }
    const salt = await bcrypt.genSalt(10);
    if(!salt)
    {
        return res.status(500).json({message: "Error while salting password"});
    }
    const hashedPassword = await bcrypt.hash(password, salt);
    if(!hashedPassword)
    {
        return res.status(500).json({message: "Error while hashing password"});
    }
    const newUser = await User.create({name, email, password: hashedPassword});
    return res.status(200).json({message: "User Created Successfully", status: 200, newUser});
}

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password)
    {
        return res.status(401).json({message: "Please provide all information"});
    }
    const userExist = await User.findOne({email});
    if(!userExist)
    {
        return res.status(401).json({message: "No user with this email found"});
    }
    const validPassword  = await bcrypt.compare(password, userExist.password);
    if(!validPassword)
    {
        return res.status(401).json({message: "Incorrect Password"});
    }
    const userInfo = {
        userId: userExist._id,
        name: userExist.name,
        email
    }
    const accessToken = await jwt.sign({userInfo}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d"
    });
    return res.status(200).json({message: "User logged in Successfully", userExist, accessToken});
}

module.exports = {createNewUser, loginUser};