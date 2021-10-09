const express = require('express');
const app = express();

const fs = require('fs');
const browserify = require('browserify');
const watchify = require('watchify');

const path = require('path');
const http = require('http').Server(app);

const httpPort = 4000;

const Stats = require("./modules/Stats.js");
const stats = new Stats();

// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
const Versions={}
function getFileVersions( fileKeys=[] ){
  const VersionFiles={
    "cssVersion" : {
      "file":"./build/style/Neurous.min.css",
      "version":null
    },
    "jsVersion" : {
      "file":"./build/js/Neurous.min.js",
      "version":null
    }
  }
  if( fileKeys.length == 0 ){
    fileKeys=Object.keys(VersionFiles)
  }else if( typeof(fileKeys) == "string" ){
    fileKeys = [fileKeys]
  }

  fileKeys.forEach( (v)=>{
    if( VersionFiles.hasOwnProperty( v ) ){
      let curFile = VersionFiles[v].file
      fs.stat(curFile, (err, stats) => {
        let curTime = Date.now()
        if(!err) {
            curTime = stats.mtime.getTime()
        }
        Versions[v] = curTime
      });
    }
  })
}
getFileVersions() // Just so there is something there if browserify hasn't completed

// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

if( process.env.NODE_ENV ){
  
  const FileManager = require("./modules/FileManager.js");
  const FileLister = new FileManager();

  var neurousCSS = browserify({
    entries: ['source/style/Neurous.css'],
    cache: {},
    packageCache: {},
    plugin: [watchify]
  });
  neurousCSS.on('update', runUglifyCSS);

  function runBrowserify () {
    const {exec} = require("child_process")
    let inputFile = "source/js/Neurous.js"
    let outputFile = "Public/js/Neurous.min.js"
    let cmd = `browserify ${inputFile} | uglifyjs -cm --mangle toplevel > ${outputFile}`

    let startTime = Date.now()
    exec(cmd, (err)=>{
      let endTime = Date.now()
      let durationTime = endTime - startTime
      console.log("-- -- -- --")
      if(err){
        console.log("  Browserify -> Uglifyjs; Errored - ")
        console.log(err)
      }else{
        console.log(`  Browserify -> Uglifyjs; Completed Successfully - ${outputFile}`)
      }
      console.log(`  Elapsed Time : ${durationTime} ms`)
      console.log("-- -- -- --")
      
      getFileVersions("jsVersion") // Get updated bundle modified time
    })
  }
    
    
  function runUglifyCSS () {
    let inputFileCSS = "source/style/Neurous.css"
    let outputFileCSS = "Public/style/Neurous.min.css"
    let cmdCSS = `uglifycss ${inputFileCSS} > ${outputFileCSS}`
    exec(cmdCSS, (err)=>{
      let endTime = Date.now()
      let durationTime = endTime - startTime
      console.log("-- -- -- --")
      if(err){
        console.log("  Uglifycss; Errored - ")
        console.log(err)
      }else{
        console.log(`  Uglifycss; Completed Successfully - ${outputFileCSS}`)
      }
      console.log(`  Elapsed Time : ${durationTime} ms`)
      console.log("-- -- -- --")
      
      getFileVersions("cssVersion") // Get updated bundle modified time
    })
    
  }
  
  runBrowserify()
  runUglifyCSS()
  
  let entryDir = "source/js"
  let neurousJS;
  FileLister.getFileListPromise( entryDir )
  .then( ()=>{
    FileLister.watchFiles( FileLister.lists[entryDir], (f)=>{ runBrowserify() } )
  })
  
}

// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --



// set the view engine to ejs
app.set('view engine', 'ejs');

//Setup folders
app.use( express.static(path.join(__dirname, '/Public')) );
//app.use( express.static(path.join(__dirname, '/Build')) );
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
