const { response } = require('express');
const express=require('express');
//const cors=require('cors');

//body parser for parsing related to post ,req.body
//const bodyParser=require('body-Parser');
//app.use(bodyParser.json());

const router=express.Router();

//importing models
const Post=require('../models/Post')
const Patient=require('../models/Patient');

router.post('/postPatient',async (req,res)=>{
    const patient=new Patient({
        _id:req.body.Id,
        Name:req.body.Name,
        Age:req.body.Age,
        Password:req.body.Password
    });

    console.log('\n\ndebug1')
    try{
        const savedPatient=await patient.save();
        return res.status(200).json(savedPatient);
    }catch(err){
        console.log('inside catch\n')
        return res.json({message:err});
    }
    // post.save()
    // .then(data=>{
    //     //res.status(200).json(data)  //printing data that DB respond in response to post.
    //     res.json(data)  //printing data that DB respond in response to post.
    // })
    // .catch(err=>{
    //     res.json({message:err});
    // })

    console.log('post Data')
    console.log(req.body);
    res.send("post Data")
});



router.get('/getPatient',(req,res)=>{
    Patient.find({_id:"nabeelnoor914@gmail.com" } ,
    (err,data)=>{
        if(err){
            console.log(err);
            return res.send(err);
        }
        else{
            console.log(data);
            return res.send(data);
        }
    }
    )
});


router.get('/deletePatient',(req,res)=>{
    Patient.remove({_id:"zulfi@gmail.com"} ,
    (err,data)=>{
        if(err){
            console.log(err);
            return res.send(err);
        }
        else{
            console.log(data);
            return res.json({message:"record has been deleted"})
            //return res.send.json({message:"record has been deleted"});
        }
    })
})

router.get('/updatePatient',(req,res)=>{
    Patient.findByIdAndUpdate(req.body.Id, {Name:req.body.Name} ,
    (err,data)=>{
        if(err){
            console.log(err);
            return res.send(err);
        }
        else{
            console.log(data);
            return res.json({message:"record has been deleted"})
            //return res.send.json({message:"record has been deleted"});
        }
    })
})





router.get('/getData',(req,res)=>{
    console.log('get Data')
    res.send("get Data")
});


router.post('/postData',async (req,res)=>{
    const post=new Post({
        _id:req.body.Id,
        title:req.body.Title,
        description:req.body.Description
    });

    console.log('\n\ndebug1')
    try{
        const savedPost=await post.save();
        res.json(savedPost);
    }catch(err){
        console.log('inside catch\n')
        res.json({message:err});
    }
    // post.save()
    // .then(data=>{
    //     //res.status(200).json(data)  //printing data that DB respond in response to post.
    //     res.json(data)  //printing data that DB respond in response to post.
    // })
    // .catch(err=>{
    //     res.json({message:err});
    // })

    console.log('post Data')
    console.log(req.body);
    res.send("post Data")
});



module.exports=router;