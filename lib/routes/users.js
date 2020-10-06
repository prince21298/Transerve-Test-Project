var express = require('express');
var router = express.Router();
const Users = require('../Services/users');
const userData= new Users;
const {generateAccessToken}=require('../Jwt/auth/auth')
const {adminId,adminPassword}=require('../../Config/constant')


// New Users be able to register with the application.
router.post('/sign_up',async function(req,res){
  var data=req.body
  await userData.Insert(data).then(data=>{
    res.send(data)
  })
  .catch(err=>{
    res.send(err)
  }) 
})

// Existing users be able to login to the application
// The admin should be able to access the system with default login (UserId:**** Password : *******)
router.post('/login',async function (req,res){
  var data= req.body;
  if(data.userId!==undefined){
    if (adminId===data.userId && adminPassword===data.password){
      data['role']='admin'
      let genrateToken = generateAccessToken(data)
      res.cookie("key",genrateToken)
      res.send('Hello Admin, I hpoe you are well')
    }else{
      res.send({
        "message":"Your userId or Password is wrong"
      })
    }

  }else{
    let emailVerify=await userData.emailVerify(data.email)
    if(emailVerify){
      let passCheck = await userData.passChecking(emailVerify,data.password)
      if (passCheck){
        let genrateToken = generateAccessToken(emailVerify)
        res.cookie("key",genrateToken)
        emailVerify['password']=NaN;  
        res.send({'Data':emailVerify})
      }
      else{
        res.send({'oops!': 'your password is wrong'})
      }
    }else{
      res.send({'oops!': 'your email is wrong'})
    }
  }
})



module.exports = router;
