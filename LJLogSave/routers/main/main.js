
var express = require("express");

var mongood = require('mongoose');

var schemaModel = require("/Users/lijiang/Desktop/nodeCode/LJLogSave/schemas/datamodel.js");




// var schemaModel = require("schemas/datamodel.js");
var router = express.Router();

/**
 * 加载首页
 */
router.get("/",function (req,res,next) {

    res.render('main/index');

});

/**
 * 上传数据的接口
 */
router.post('/save',function (req,res,next) {
    var dats = req.body.posd;
   // console.log(dats);
   if (dats){
       for (var i in dats){
          var dat = dats[i];
           // console.log(dat);
           var  Model =  mongood.model(dat.system,schemaModel);
           var modle = new Model({
               system : dat.system,
               type : dat.type,
               date : dat.date,
               other : dat.other
           });
           modle.save();
           // modle.remove();
       }
   }
});

router.get('/check',function (req,res,next) {
   res.render('main/checkAll');
});


/**
 * 查询
 */

router.post('/checkBy',function (req,res,next) {

    console.log(req.body);
    if (req.body.system==""){
        res.render('main/checkAll');
    }else {
        renderAdminTable(req,res,2);

    }


});


/**
 * 分页处理函数封装
 */

function renderAdminTable(req,res,limit) {

    var page = req.query.pages || 1;
    var count = 0;
    var pod = req.body;
    var  Model =  mongood.model(pod.system,schemaModel);
    var p = {"type" : pod.type,"date":pod.date};
    if (pod.type == ""){
        delete p.type;
    }
    if(pod.date == ""){
        delete p.date;
    }
    Model.find(p,function (error,data) {
       count = data.length;//数据总条数
       var pages = Math.ceil(count/limit);//计算页数
        page = Math.min(page,pages);//最后一页
        page = Math.max(page,1);
        var skip = (page - 1) * limit;
        // console.log(data);
        res.render('main/checkAll',{
            data:data,
            page:page,
            pages:pages,
            limit:limit,
            count:count
        });


    });
}

module.exports = router;