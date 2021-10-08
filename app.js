const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const http = require('http').Server(app);

const httpPort = 4000;

const Stats = require("./modules/Stats.js");
const stats = new Stats();

// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
const Versions={}
function getFileVersions(){
  const VersionFiles={
    "cssVersion" : {
      "file":"./Public/style/Neurous.css",
      "version":null
    },
    "jsVersion" : {
      "file":"./Build/js/Neurous-Bundle.js",
      "version":null
    }
  }

  Object.keys(VersionFiles).forEach( (v)=>{
      let curFile = VersionFiles[v].file
      fs.stat(curFile, (err, stats) => {
        if(err) {
            throw err;
        }
        Versions[v] = stats.mtime.getTime();
      });
  })
}
getFileVersions() // Just so there is something there if browserify hasn't completed

// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --



function browserify () {
  const {exec} = require("child_process")
  let inputFile = "Public/js/Neurous.js"
  let outputFile = "Build/js/Neurous-Bundle.js"
  let cmd = `browserify ${inputFile} | uglifyjs -b -cm --mangle toplevel > ${outputFile}`

  let startTime = Date.now()
  exec(cmd, (err)=>{
    let endTime = Date.now()
    let durationTime = endTime - startTime
    console.log("-- -- -- --")
    if(err){
      console.log("  Browserfy Errored; ")
      console.log(err)
    }else{
      console.log(`  Browserfy Completed Successfully; ${outputFile}`)
    }
    console.log(`  Elapsed Time : ${durationTime} ms`)
    console.log("-- -- -- --")
    
    getFileVersions() // Get updated bundle modified time
  })
}
browserify()

// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --



// set the view engine to ejs
app.set('view engine', 'ejs');

//Setup folders
app.use( express.static(path.join(__dirname, '/Public')) );
app.use( express.static(path.join(__dirname, '/Build/js')) );
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
