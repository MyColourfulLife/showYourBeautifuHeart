var jsonFile = require('jsonfile')
var fs = require('fs')

/**
 * 扫描指定目录下的JSON文件，并将其汇总写入到指定的文件
 * @param {*要扫描的文件地址} scanFileDir 
 * @param {*要输出的文件地址} outPutDir 
 * @param {*处理错误的回调} errCallBack
 * 错误回调的有两个参宿，一个是错误信息，一个是出错的文件列表 
 */
function collectAllJsonFile(scanFileDir,outPutDir,errCallBack) {
    fs.readdir(scanFileDir,{encoding:'utf-8'},function(err,files){
        if (err) {
            console.log('读取文件失败')
            console.log(err)
            errCallBack(err,null)
            return;
        }
    
        // 2. 过滤出所有的js文件
    
        // 定义变量接收
        var jsonFileList = [];
        files.forEach(function(element) {
            if (element.includes('.json')) {
                jsonFileList.push(element)
            } else {
                //不处理非json文件
            }
        }, this);
    
        // 3. 利用jsonfile的方法循环读取内容到一个json的数组变量中。
        // 存储变量的值
       jsonList = []
       jsonFailReadList = []
       jsonFileList.forEach(function(element) {
        try {
          jsonContent =  jsonFile.readFileSync(scanFileDir + element)
          if (jsonContent) {
            jsonList.push(jsonContent)
          }
          
        } catch (error) {
            jsonFailReadList.push(element)
            console.log('文件读取错误%s',error)
        }
    
       }, this);
       
    //    4. 将内容写入到一个json文件中。
       jsonFile.writeFile(outPutDir,jsonList,{spaces:2},function (err) {
           if (err) {
               console.log('文件写入失败:%s',err)
               errCallBack(err,jsonFailReadList)
           }
       })
    })
}


var scanFileDir = '/Users/taodelong/Desktop/colorfulLife/words-from-the-heart/';
var outPutDir = './all_words.json';

collectAllJsonFile(scanFileDir,outPutDir,function (err,fileList) {
    
    if (err) {
        console.log('操作失败%s',scanFileDir)
    } 

    if (fileList) {
        jsonFile.writeFile('./error_data.json',fileList,{spaces:2},function (err) {
                if (err) {
                    console.log('文件写入失败:%s',err)
                }
            })
    }
})