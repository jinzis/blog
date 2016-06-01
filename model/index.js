/**
 * Created by jinxin on 2016-06-01.
 */
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/jinziblog');
var userSchema=new mongoose.Schema({
    username:{type:String},
    password:{type:String},
    email:{type:String},
    avatar:{type:String}
});
var userModel=mongoose.model('user',userSchema);
module.exports={
    user:userModel,
}   

