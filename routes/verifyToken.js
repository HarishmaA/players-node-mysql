const jwt = require('jsonwebtoken');
const { findUserByToken } = require('./db');

module.exports = async function auth(req,res,next) {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied!');
    try {
      const user = await findUserByToken({token});
      if(!user || !user.token) return res.status(400).send("Not Logged In!");
      const verifiedPayload = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = verifiedPayload;
      next();
    } catch(err) {
        console.log(err);
        return res.status(400).send('Invalid Token!');
    }
}