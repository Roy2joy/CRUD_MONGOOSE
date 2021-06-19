const { json } = require('body-parser');
const { Pool } = require('pg');   //for postgres
//const mongoose=require('mongoose');//for moongose
require('dotenv/config');  //for hiding of connection string.


// mongoose.connect(process.env.Mongo_connection,{ useNewUrlParser: true },()=>{
//     console.log("Connection to Mongo is Established.")
// });  //pass url for connections




 module.exports.DBcontroller2 = DBcontroller2;