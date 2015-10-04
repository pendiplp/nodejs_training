var http = require("http");
var fs	 = require('fs');
var url	 = require('url');
var cool = require('cool-ascii-faces');
http.createServer(function(req, res) {
	var href = req.url.replace('/','');
	if(href=="favicon.ico") return;
	switch (true){
		case href == "hello":
			html = "Hellow Word";
			break;
		case /name/.test(href):
			html = "Hello "+url.parse(href, true).query['name'];
			break;
		case /cool/.test(href):
			var html = '';
			var len = url.parse(href, true).query['jumlah'];
			var length = (len>2?len:2);
			var ht = ("<!DOCTYPE html><html><head><title></title><style></style></head><body><pre>");
			for(var i=1;i<=length;i++){
				html+=i+"\t: "+cool()+"\n\n";
			}
			html=ht+html;
			//href+="\n"+html;
			break;
		default:
			var path = ('../../me/lat/cv/');
			if(/.hml|.css|.png|.jpg|.js/.test(href)) path+=href; else path+="index.html";
 			fs.readFile(path, function(err, isi){
 				if(err) return
				res.write(isi);
				res.end();
				html = null;
 			});
 			console.log('default')
 			break;
	}
	if(html!=null){
		res.write(html);
		res.end();
	}
	console.log("url: http://localhost:3000/"+href);
}).listen(3000);

console.log("Server is listening");

// cd htdocs/NodeJs; node index.js
