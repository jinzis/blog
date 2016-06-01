/**
 * Created by jinxin on 2016-06-01.
 */
//此中间件要求必须先登录之后才能访问
exports.checkLogin=function (req,res,next) {
    if(req.session.user){
        next()
    }else{
        req.flash('error','请先登录');
       return res.redirect('/users/login')
    }
}
exports.checkNoLogin=function (req,res,next) {
    if(req.session.user){
        req.flash('error','你已经登录了?不用再登录了');
        return res.redirect('/')
    }else{
next()
    }
        }