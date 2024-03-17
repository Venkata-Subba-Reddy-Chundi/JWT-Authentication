const express = require('express');
const mongoose = require('mongoose');
const app = express();
const RegisteredUser=require('./model')
const jwt=require('jsonwebtoken')
const middleware=require('./middleware');
const cors=require('cors')

mongoose.connect(`mongodb+srv://subbareddychundi:1234@cluster0.tak8sag.mongodb.net/?retryWrites=true&w=majority`)
.then(()=>console.log("DB connection established"))
.catch(err => console.log("error"))

app.get('/', (req, res) => {
  res.send('Hello World man');
})

app.use(express.json())
app.use(cors())

app.post('/register',async(req,res)=>{
    try{
        const {username,email,password,confirmPassword} =req.body;
        console.log(req.body);
        let exist=await RegisteredUser.findOne({username,email})
        if(exist){
            return res.status(400).send('User already registered')
            // res.send("User already exist")
        }
        if(password!==confirmPassword){
            return res.status(400).send("Passwords do not match")
        }
        let newUser= new RegisteredUser({
            username,
            email,
            password,
            confirmPassword
        })
        await newUser.save();
        res.status(200).send("User registered Successfully")
    }catch(err){
        console.log(err)
        res.status(500).send("Server Error")
    }
})

app.post('/login',async(req,res)=>{
    try{
        const {email,password} = req.body;
        let exist=await RegisteredUser.findOne({email:email});
        if(!exist){
            return res.status(400).send("User not found")
        }
        if(exist.password!==password){
            return res.status(400).send("Invalid Credentials")
        }
        let payload={
            user:{
                id:exist._id
            }
        }
        jwt.sign(payload,'jwtSecret',{expiresIn:3600000},
            (err,token)=>{
                if(err){
                    console.log(err)
                }
                return res.status(200).json({token})
            })

    }catch(err){
        console.log(err)
        res.status(500).send("Server Error")
    }
})

app.get('/myprofile',middleware,async(req,res)=>{
    try{
        let exist=await RegisteredUser.findById(req.user.id)
        if(!exist){
            return res.status(400).send("User not found")
        }
        return res.status(200).json(exist)
    }
    catch(err){
        console.log(err)
        res.status(500).send("Server Error")
    }
})

app.listen(5000,()=>{
    console.log('Server is running on port 5000');
})
