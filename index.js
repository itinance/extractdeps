#!/usr/bin/env node
var co = require('co');
var cli = require('commander');
var fs = require('fs');
var shell = require('shelljs');

function * exec(cmd, verbose) {
    if(verbose) console.log("\nCMD " + cmd);
    var ret = shell.exec(cmd).output;
    
    if(ret !== 0 && ret !== undefined) {
        console.log("ERROR: there is an error occured: ", ret);
        process.exit();
    }
    return ret;
}

cli.arguments('<file>')
  // .option('-i, --ios', 'Compile for iOS')
  .option('-v, --verbose', 'Be more verbose')
  .option('-d, --dev', 'Use devDependencies instead')
  .action(function(file) {
      verbose = cli.verbose
      
      co(function *() {
          var content = fs.readFileSync(file, 'utf-8')
          
          if(!content) return;

          var json = JSON.parse(content);

          var deps = cli.dev ? json.devDependencies : json.dependencies;
          
          var names = Object.keys(deps);
          
          names.map( name => console.log(name) )
      })
  })
  
  .parse(process.argv);
