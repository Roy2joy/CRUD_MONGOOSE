const { response } = require('express');
const express=require('express');
//const cors=require('cors');

//body parser for parsing related to post ,req.body
//const bodyParser=require('body-Parser');
//app.use(bodyParser.json());

const router=express.Router();

//importing models
const Post=require('../models/Post')



router.post('/postData',async (req,res)=>{
    const post=new Post({
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

router.get('/getData',(req,res)=>{
    console.log('get Data')
    res.send("get Data")
});


module.exports=router;