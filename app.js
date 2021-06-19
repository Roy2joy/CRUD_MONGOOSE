const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors');
const app=express();
const bodyParser=require('body-parser');
require('dotenv/config');
const { Pool } = require('pg');   //for postgres
const port = 3001 ;


const DB='mongodb+srv://HAdmin:nabeel123@cluster0.ypgny.mongodb.net/HMSDB?retryWrites=true&w=majority'

mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
})
.then(()=>{
    console.log('Connection Successful');
})
.catch(()=>{
    console.log('No connection')
});


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://HAdmin:nabeel123@cluster0.ypgny.mongodb.net/HMSDB?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {

//     var query = { name: "Talha" };

//   //const collection = client.db("test").collection("devices");
//     const collection = client.db("HMSDB").collection("Patient")//.find(query);
//   // perform actions on the collection object
//   console.log(collection)
//   console.log("Connection established")
//   client.close();
// });

app.use(cors())


app.use(bodyParser.json());  //to parse JSON
app.use(bodyParser.urlencoded({extended:true}));   //donot harm my code

//importing routes
const postsRoute=require('./routes/posts');
const userRoute=require('./routes/get');
const deleteRoute=require('./routes/delete');
const putRoute=require('./routes/put');

const testRoute=require('./routes/test')  //testing routes

//routes
app.use('/posts',postsRoute);
app.use('/get',userRoute);    

app.use('/delete',deleteRoute);
app.use('/put',putRoute);
app.use('/test',testRoute)   //testing routes


app.get('/',(req,res)=>{
    res.send('we are on home');
})


app.listen(port);


// app.delete('/',(req,res)=>{
//     console.log("hello world to name");
// });

/////////////////implementation of classes




 

