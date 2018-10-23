const express = require('express')
const router = express.Router()
const passport = require('../passport')
var jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const mySecret = "thisIsTopSecret";
const checkIfAuthenticated = expressJwt({
    secret: mySecret
}); 

//No redirect
router.post('/login', passport.authenticate('local', { 
    session: false
  }),(req,res)=>{
      var token = jwt.sign(req.user, mySecret, { expiresIn: "7d" });
      res.send({token});
  });

router.get('/',checkIfAuthenticated, function (req, res){
    res.send(req.user);
});

router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
})

module.exports = router