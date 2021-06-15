const express=require('express');
//const cors=require('cors');
//const Posts = require('../models/Posts');
const router=express.Router();
// const Post=require('../models/Posts');

router.delete('/',(req,res)=>{    // /delete
    res.send("We are on delete base in deelte.js file");
})

router.delete('/reactor',(req,res)=>{   // /delete/reactor
    //console.log(req);
    console.log('delete reactor');
    console.log(req.body.movieName);   //undefined error>
    console.log(req.body.movieReview);
    res.json([{"movieName":"deleteresponse_check1","movieReview":"Excellent"},{"movieName":"deletesponse_check2","movieReview":"Excellent"}]);
})


// router.get('/specific',(req,res)=>{
//     res.send('This is specific post')
// })
module.exports= router;