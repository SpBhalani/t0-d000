const jwt = require('jsonwebtoken');

const requireSignin = (req,res,next) =>{
    if(!req.headers.authorization){
        return res.status(400).json({message : 'Require Signin' })
    }
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token,process.env.SECRET_KEY);
    // console.log(user);
    req.user = user;
    next();
}

module.exports = {
    requireSignin
}