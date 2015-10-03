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
			for(var i=1;i<=length;i++){
				html+="face"+i+": "+cool()+"\n";
			}
			href+="\n"+html;
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
	}
	if(html!=null){
		res.write(html);
		res.end();
	}
	console.log(href);
}).listen(3000);

console.log("Server is listening");

// cd htdocs/NodeJs; node index.js
