const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const User = require('../models/user')
const auth = require('../middleware/auth')
const {sgMailWelcome , sgMailCancel} = require('../emails/account')
const userRouter = new express.Router()

userRouter.post('/users',async(req,res) =>{
    const user = new User(req.body)
    try{
        await user.save()
        sgMailWelcome(user.email,user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    }catch(error){
        res.status(400).send(error)
    }
})
userRouter.post('/users/login',async(req,res) => {
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send({user ,token})
    }catch(e){
        res.status(400).send(e)
    }
})
userRouter.get('/users/me',auth,async(req,res) => {
    try{
        res.send(req.user)
    }catch(e){
        res.status(400).send(e)
    }
})


userRouter.post('/users/logout',auth,async(req,res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send(e)
    }
})

userRouter.post('/users/logoutAll',auth,async(req,res) => {
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send(e)
    }
})

userRouter.patch('/users/me',auth,async(req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password','age']
    const isAllowedOper = updates.every((update) => {
        return allowedUpdates.includes(update)
    })
    if(!isAllowedOper){
        return res.status(404).send({"error" : "Invalid updates"})
    }

    try{
        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })
        await req.user.save()
        res.send(req.user)
    }catch(e){
        res.status(400).send(e)
    }
})

userRouter.delete('/users/me',auth,async(req,res) => {
    try{
        sgMailCancel(req.user.email,req.user.name)
        await req.user.remove()
        res.send(req.user)
    }catch(e){
        res.status(400).send()
    }
})

const upload = multer({
    limits : {
        fileSize : 1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload correct file'))
        }
        cb(undefined,true)
    }
})

userRouter.post('/users/me/avatar',auth,upload.single('avatar'),async(req,res) => {
    const buffer  = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()    
    res.send()
},(error, req, res,next) => {
    res.status(400).send({error : error.message})
})

userRouter.delete('/users/me/avatar',auth,upload.single('avatar'),async(req,res) => {
    req.user.avatar = undefined
    await req.user.save()    
    res.send()
},(error, req, res,next) => {
    res.status(400).send({error : error.message})
})

userRouter.get('/users/:id/avatar',async(req,res) =>{
    try{
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error
        }
        res.set('Content-Type','image/png')
        res.send(user.avatar)
    }catch(e){
        res.status(404).send()
    }
})
module.exports = userRouter