//you have to implement schema for Mongo here.Actually it is models
const mongoose=require('mongoose');

const PostSchema=mongoose.Schema({
    _id:{
        type:Number,
        required:true
    },
    title : {
        type:String,
        required:true
    },
    description : {
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }

});

module.exports=new mongoose.model('Post',PostSchema);