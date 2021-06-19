//you have to implement schema for Mongo here.Actually it is models
const mongoose = require('mongoose');
const validate = require( 'mongoose-validator' );
//import { isEmail } from 'mongoose-validator';
const secondValidator=require('validator'); 
// var IdValidator= [
//     validate(
//         {
//             validator: 'isLength',
//             aruguments: [3,50],
//             message: 'Error generated due to lenght issue'
//         }
//     )
// ]

const PatientSchema=mongoose.Schema({
    _id:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        validate: [secondValidator.isEmail,'invalid Email']
    },
    Name : {
        type:String,
        required:true
    },
    Age : {
        type:Number,
        required:true
    },
    Address:{
        type:String,
        default:'-'
    },
    Gender:{
        type: String,
        enum:['M','F','N']
    },
    ContactNumber:{
        type: String,
        default:"-"
        //lenght check
    },
    CNIC:{
        type:String,
        default:'-'
        //CNIC length check
    },
    Password:{
        type:String,
        required:true
    }

});

module.exports=new mongoose.model('Patient',PatientSchema);