const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const http = require('http').Server(app);

const httpPort = 4000;

const Stats = require("./modules/Stats.js");
const stats = new Stats();

const VersionFiles={
  "cssVersion" : {
    "file":"./Public/style/Neurous.css",
    "version":null
  },
  "jsVersion" : {
    "file":"./Public/js/Neurous.js",
    "version":null
  }
}

const Versions={}

Object.keys(VersionFiles).forEach( (v)=>{
    let curFile = VersionFiles[v].file
    fs.stat(curFile, (err, stats) => {
      if(err) {
          throw err;
      }
      Versions[v] = stats.mtime.getTime();
    });
})




// set the view engine to ejs
app.set('view engine', 'ejs');

//Setup folders
app.use( express.static(path.join(__dirname, '/Public')) );
//app.use('/images', express.static(path.join(__dirname, '/Source/images')) );
//app.use('/js', express.static(path.join(__dirname, '/Source/js')) );
//app.use('/style', express.static(path.join(__dirname, '/Source/style')) );



// index page
app.get('/', function(req, res) {
	
  stats.stepCount(req);
	console.log(Versions)
	
  let ver = Date.now();
  res.render('index.ejs', Versions);
});


//Setup http and https servers
http.listen(httpPort, function () {
	console.log(`Neurous.Net listening on  localhost:${httpPort}`);
});
