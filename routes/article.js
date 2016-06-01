var express = require('express');
var router = express.Router();

/* 获取提交表单*/
router.get('/add', function(req, res, next) {
  res.render('article/add',{});
});
/* 提交文章表单 */
router.post('/add', function(req, res, next) {
  res.send('post add');
});


module.exports = router;
