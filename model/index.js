/**
 * Created by jinxin on 2016-06-01.
 */
var mongoose=require('mongoose');
mongoose.connect('mongodb://https://123.57.143.189:27017/jinxinblog');
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

