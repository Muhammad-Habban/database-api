const jwt = require("jsonwebtoken");

const verifyJwt = async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if(!authHeader?.startsWith("Bearer "))
    {
        return res.status(401).json({message: "Unauthorized Access. Auth header not set."});
    }
    const token = authHeader.split(" ")[1];
    if(!token)
    {
        return res.status(401).json({message: "Unauthorized Access. Token not found"});
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err)
        {
            return res.status(401).json({message: "Unauthorized Access"});
        }
        const {name, email} = decoded.userInfo;
        req.user = {name, email};
        next();
    });
}

module.exports = verifyJwt;