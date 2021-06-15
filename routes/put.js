const express=require('express');
//const cors=require('cors');
//const Posts = require('../models/Posts');
const router=express.Router();
// const Post=require('../models/Posts');

//route.use(cors());
router.put('/',(req,res)=>{    // /delete
    res.send("We are on delete base in deelte.js file");
})

router.put('/reactor',(req,res)=>{   // /delete/reactor
    //console.log(req);
    console.log('update reactor final');
    console.log(req.body.movieName);   //undefined error>
    console.log(req.body.movieReview);
    res.json([{"movieName":"updateresponse_check1","movieReview":"Excellent"},{"movieName":"updatesponse_check2","movieReview":"Excellent"}]);
    // res.send('You are inside reactor\'s update');
})


// router.get('/specific',(req,res)=>{
//     res.send('This is specific post')
// })
module.exports= router;