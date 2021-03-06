var fs = require("fs");
var phantom=require('node-phantom');
var phRouterService = require('../../service/phantomservice/PhRouterService');
var Service = {};

/**
 *  生成图表导出文件
 * @param callback
 */
Service.phantomJqplot = function (chart,filename,callback){
    phantom.create(function(error,ph){
        if(error){
            console.log('phantom.create error happened !....');
        }
        ph.createPage(function(err, page){
            if(err){
                console.log('ph.createPage error happened !....');
            }
            page.onConsoleMessage = function (msg) {
                console.log('page.evaluate console.log :  ' + msg);
            };
            page.onCallback = function(data) {// data can be useful
                var imagepath = 'export/ph/'+filename;
                //var imagepath = filename;
                page.render(imagepath);
                ph.exit();
                if(callback!=undefined){
                    callback(imagepath);
                }
            };
            page.open("http://localhost:1988/phpage" , function(err,status) {
                if(err){
                    console.log(' page.open error : ' + err);
                }
                setTimeout(function() {
                    phRouterService.router(ph ,page ,chart,filename,callback);
                },1500); // 加载页面上的js , 执行ajax
            });
        });
    },{phantomPath:require('phantomjs').path});
}

module.exports = Service;