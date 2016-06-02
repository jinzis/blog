var express = require('express');
var router = express.Router();
var model=require('../model');
var ware=require('../ware');
/* 获取注册表单*/
router.get('/reg',ware.checkNoLogin, function(req, res, next) {
  res.render('user/reg',{});
});
/* 提交注册表单 */
router.post('/reg',ware.checkNoLogin, function(req, res, next) {
  var user=req.body;
  if(user.password!=user.repassword){
    req.flash('error',"两次密码输入不一样");
    return res.redirect('back');
  }
  delete user.repassword;
  user.avatar = "https://s.gravatar.com/avatar/"+md5(user.email)+"?s=48";
  model.user.create(user,function (err,doc) {
    if(err){
      req.flash('error',"注册失败");
      return res.redirect("back");

    }else{
      req.session.user=doc;
      req.flash('success',"注册成功");
      res.redirect("/");

    }
  })
});
function md5(str) {
  return require('crypto').createHash('md5').update(str).digest('hex');
}
/*获取登录信息*/
router.get('/login',ware.checkNoLogin, function(req, res, next) {
  res.render('user/login',{});
});
/*提交登录信息*/
router.post('/login',ware.checkNoLogin, function(req, res, next) {
  var user=req.body;
  model.user.findOne(user,function (err,doc) {
    if(err){
      req.flash('error',"登录失败，用户名和密码不符");
      res.redirect('back');
    }else{
      req.session.user=doc;
      res.redirect('/');
    }
  })
});
/*退出*/
router.get('/logout',ware.checkLogin, function(req, res, next) {
  req.session.user=null;
  res.redirect('/users/login');
});

module.exports = router;
