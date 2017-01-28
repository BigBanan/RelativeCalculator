var express = require('express');
var app = express();

// 配置静态文件目录
app.use(express.static('static'))

var sendHtml = function(path, response) {
    var fs = require('fs')
    var options = {
        encoding: 'utf-8',
    }
    fs.readFile(path, options, function(err, data){
        console.log(`读取的html文件 ${path} 内容是`, data)
        response.send(data)
    })
}


app.get('/', function (request, response) {
    var path = 'index.html'
    sendHtml(path, response)
})

app.listen(80, function () {
  console.log('Example app listening on port 80!');
})
