var http = require('http');

var fs = require('fs');//读取文件

var io = require('socket.io');

var documentRoot ='C:/Users/kana/Desktop/miaov/HTML5/L5/L5.5/www';

var httpServer = http.createServer(function(req,res){
	
	var url = req.url;
	
	console.log(url);
	
	var file = documentRoot + url;
	
	console.log(file);
	
	fs.readFile(file,function(err,data){
		if(err){
			res.writeHeader(404,{
				'content-type':'text/html;charset="utf-8"'
				});
				res.write('<h1>404</h1><p>找不到</p>');
				res.end();
			}else{
				res.writeHeader(200,{
				'content-type':'text/html;charset="utf-8"'
				});
				res.write(data);
				res.end();
				}
		
		});
	
	}).listen(8888);

var socket = io.listen(httpServer);

socket.sockets.on('connection', function(socket) {
	//console.log('有人通过socket进来了');
	
	socket.emit('hello','欢迎');
	
	/*socket.on('hellotoo',function(data){
		console.log(data);
		})*/
	socket.broadcast.emit('a','有新人进来了');
	
	socket.on('move',function(data){
			socket.broadcast.emit('move2', data);
		})
	})