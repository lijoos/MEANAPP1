const express=require('express');
const router=express.Router();
const passport=require('passport');
const jwt=require('jsonwebtoken');

const User=require('../model/user');
const Config=require('../config/database');
//register
router.post('/register',(req,res,next)=>{
    //res.send('register');
    let newUser=new User({
        name:req.body.name,
        email:req.body.email,
        username:req.body.username,
        password:req.body.password
    });
    User.addUser(newUser,(err,user)=>{
        
        if(err){
            res.json({success:false,msg:'Fail to egiste user'});
        }
        else{
            res.json({success:true,msg:'user Registered'});
        }

    })
});

//authenticate
router.post('/authenticate',(req,res,next)=>{
    
const username=req.body.username;
    const password=req.body.password;
    User.getUserByUserName(username,(err,user)=>{
        if(err) throw err;
        if(!user){
        return res.json({success:false,msg :'user not found'});
        }
        User.comparePassword(password,user.password,(err,isMatch)=>{
            if(err) throw err;
            if(isMatch){
                const token=jwt.sign(user,Config.secret,{
                    expiresIn:604800
                });
                res.json({
                    success:true,
                    token:'JWT '+token,
                    user:{
                        id:user.id,
                        name:user.name,
                        email:user.email,
                        username:user.username
                    }
                });
            }
            else{
                return res.json({success:false,msg :'wrong password'});
            }
        })


    });
});

//register
router.get('/profile',passport.authenticate('jwt', {session:false}),(req,res,next)=>{
  res.json({user: req.user});
});


//validate
router.get('/validate',(req,res,next)=>{
    res.send('vaidate');
});
module.exports=router;