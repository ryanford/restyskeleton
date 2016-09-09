#!/usr/bin/env node

var fs  = require("fs");
var program = require("commander");
var shell = require("shelljs");
var cp = require("child_process");

var make_skeleton = function(){
    
    program.version('1.0.0');        
    program.option('-d, --directory <dirname>',
		   'Creates an openresty skeleton in the directory name supplied as argument')
	.action(function(dirname){
	    
	});
    program.parse(process.argv);
    var dir = program.directory;
    if (!fs.existsSync(dir)){
	try{
	    fs.mkdirSync(dir);
	    shell.cp("-R","files/*",dir);
	    shell.cd(dir);
	    console.log(process.cwd());
	    var which = shell.which("nginx");
	    if(which.stdout.indexOf("openresty")===-1){
		console.log("restyskeleton could not find openresty in your path. Are you sure you have installed it?");
		console.log("Please cd into '"+dir
			    +"' and try running your application manually");
	    }
	    cp.exec("nginx  -p ./  -c ./dev.ngx.conf",function(error,stdout,stderr){
		console.log(stdout);
		console.log(stderr);
		console.log(error);
		if(stderr){
		    console.log(stderr);
		    console.log("Couldn't start openresty. Please cd into '"+dir+
				"' and try running your application manually");
		}
		else{
		    console.log("Your openresty application is running on http://localhost:3125");
		}
	    });
	    
	}
	catch(ex){
	    console.log(ex);
	    console.log("Can't create a project in " +dir);
	}
    }else{
	console.log("The directory "+ dir+
		    " already exists. Can't create an openresty skeleton in an existing directory" );
    }
    process.exit();    

};
make_skeleton();
