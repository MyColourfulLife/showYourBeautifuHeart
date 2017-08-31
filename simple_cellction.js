var jsonFile = require('jsonfile')
var fs = require('fs')

// 1. 先扫出所有的文件名。
var scanFileDir = '/Users/taodelong/Desktop/colorfulLife/words-from-the-heart/'

fs.readdir(scanFileDir,function(err,files){
    if (err) {
        console.log('读取文件失败')
        console.log(err)
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
    //    使用异步函数读取数据
    //    jsonFile.readFile(scanFileDir + element,function (err,obj) {
    //        if (err) {
    //            console.log('内容读取错误');
    //            console.log(err);
    //            return;
    //        }
    //        //放入数组中 
    //        //异步回调回来的时机不确定 不能保证和文件内容和文件名的一致性
    //        jsonFile.push(obj)
    //    })

    // 使用同步函数读取数据
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
   
   // 4. 将内容写入到一个json文件中。
   jsonFile.writeFile('./all_words.json',jsonList,{spaces:2},function (err) {
       if (err) {
           console.log('文件写入失败:%s',err)
       }
   })

   //处理下错误的文件
   jsonFile.writeFile('./error_data.json',jsonFailReadList,{spaces:2},function (err) {
    if (err) {
        console.log('文件写入失败:%s',err)
    }
})


})



// 5. 把最终得到的json文件的内容反映到html上，请参考github_index/index.html
// 6. 修饰一下你的html效果。
// 7. 部署到你github项目的页面上。
