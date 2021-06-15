const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors');
const app=express();
const bodyParser=require('body-parser');
require('dotenv/config');
const { Pool } = require('pg');   //for postgres
const port = 3001 ;


//implementation of cors ---to enable different domain checks --{standard}
// var whitelist=[ 'https://znts-frontend.herokuapp.com/',
//                 'http://localhost:3000',
//                 'http://localhost:3001'
//               ]

// var corsOptionsDelegate=function(req,callback){
//     var corsOptions;
//     if(whitelist.indexOf(req.header('Origin'))!== -1){
//         corsOptions={
//             origin:true,
//             credentials:true,
//             exposedHeaders: ['set-cookie'] 
//         }
//     }
//     else {
//         corsOptions={
//             origin:true,
//             credentials:true,
//             exposedHeaders: ['set-cookie'] 
//         }
//     }
//     callback(null,corsOptions)
    
// }

// app.use(cors(corsOptionsDelegate));

app.use(cors())


//////////////  implementation of cors and other things /////////////////////////////////////////////////////////////////


//middle ware
// app.use('/posts',(req,res)=>{
//     res.send("this is middleware run whenever get posts hit.");
// });

//
//app.use(cors());
app.use(bodyParser.json());  //to parse JSON
app.use(bodyParser.urlencoded({extended:true}));   //donot harm my code

//importing routes
const postsRoute=require('./routes/posts');
const userRoute=require('./routes/get');
const deleteRoute=require('./routes/delete');
const putRoute=require('./routes/put');
//routes
app.use('/posts',postsRoute);
app.use('/get',userRoute);    

app.use('/delete',deleteRoute);
app.use('/put',putRoute);



app.get('/',(req,res)=>{
    res.send('we are on home');
})


app.listen(port);


// app.delete('/',(req,res)=>{
//     console.log("hello world to name");
// });

/////////////////implementation of classes




 

