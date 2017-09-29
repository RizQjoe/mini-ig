var jwt = require('jsonwebtoken');
require('dotenv').config()

var islogin = (req,res,next) => {
  jwt.verify(req.headers.token,process.env.SECRET_TOKEN,function(err,decoded){
    if(!err){
      req.id = decoded.id,
      req.user_id = decoded.user_id,
      req.email = decoded.email,
      req.name = decoded.name
      console.log(req);
      next()
    } else {
      res.send(err)
    }
  })
}


module.exports = {islogin};
