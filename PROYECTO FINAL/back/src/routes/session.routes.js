import express, { Router } from 'express';
import {serialize,passportCall} from '../utils.js'
import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import { uploader } from '../utils.js';


const router = express.Router();

router.get('/current',passportCall('jwt'),(req,res)=>{
    let user = serialize(req.user,["first_name","last_name","role","profile_picture"])
    res.send({status:"success",payload:user});
})

router.post('/register',uploader.single('profilePic'),passportCall('register'),(req,res)=>{
    res.send({status:"success",message:"Signed Up"})
})

router.post('/login',passportCall('login'),(req,res)=>{
    let user;
    if(req.user.role!=="superadmin"){
        user = serialize(req.user,['first_name','last_name']);
    }else{
        user=req.user;
    }
    let token = jwt.sign(user,config.jwt.secret)
    if(config.app.sessionPersistence==="COOKIE"){
        res.cookie(config.jwt.cookie,token,{
            httpOnly:true,
            maxAge:60*60*1000
        })
        res.cookie('sessionCookie','boom',{
            maxAge:60*60*1000
        })
        return res.send({status:"success",payload:{user,expiresAt:60*60*1000}})
    }else if(config.app.sessionPersistence==="local_storage"){
        return res.send({status:"success",payload:{user,token,expiresAt:60*60*1000}})
    }
})

router.post('/register',uploader.single('profilePic').passportCall('register'),(req,res)=>{
    let user = req.user;
    res.send({status:"success",payload:user})
})

export default router;