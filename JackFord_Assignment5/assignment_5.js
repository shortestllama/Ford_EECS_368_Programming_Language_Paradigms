/*
EECS 368 Assignment 5
Simple server using node js
Inputs: files or directories wanting to be created
Outputs: list of files or directories
Jack Ford
10/31/2022
*/
const {createServer} = require("http"); //get the createServer function from the http module

const methods = Object.create(null); //an object of the methods available to the user

createServer((request, response) => { //create the server with the request to the server and the response to the client
  let handler = methods[request.method] || notAllowed; //initializes the request handler to the request made by the user or the notAllowed function if an invalid request was provided
  handler(request) //promise to determine what to do with the request
    .catch(error => { //if promise is rejected, runs the error method
      if (error.status != null) return error; //checks to see if the error is anything and returns it
      return {body: String(error), status: 500}; //if its not anything, makes it a 500 error and returns it
    })
    .then(({body, status = 200, type = "text/plain"}) => { //if promise is accepted, runs the function with the request's information
       response.writeHead(status, {"Content-Type": type}); //creates a write stream for the response
       if (body && body.pipe) body.pipe(response); //checks to see if the value of body is a readable stream and converts it to a writeable stream
       else response.end(body); //otherwise, is passed to the response's end method
    });
}).listen(8000); //causes the server to start waiting for connections on port 8000

async function notAllowed(request) { //initializes a function to return an error if the parameter is not allowed
  return { //returns
    status: 405, //the error status
    body: `Method ${request.method} not allowed.` //the error message
  };
}

var {parse} = require("url"); //get the parse function from the url module
var {resolve, sep} = require("path"); //get the resolve, sep function from the path module

var baseDirectory = process.cwd(); //initializes the baseDirectory to the processes currently working directory

function urlPath(url) { //initializes the urlPath function to take in a url
  let {pathname} = parse(url); //initializes the pathname to the parsed url
  let path = resolve(decodeURIComponent(pathname).slice(1)); //resolves the relative path
  if (path != baseDirectory && !path.startsWith(baseDirectory + sep)) { //checks to see if the the path is not the baseDirectory and doesn't start with the base directory
    throw {status: 403, body: "Forbidden"}; //throws a forbidden error
  }
  return path; //returns the path
}

const {createReadStream} = require("fs"); //get the createReadStream function from the fs module
const {stat, readdir} = require("fs").promises; //get the stat, readdir promises from the fs module
const mime = require("mime"); //get the mime function to determine the type of a file from the mime module

methods.GET = async function(request) { //initializes an async method with a request parameter
  let path = urlPath(request.url); //initializes the path variable to the url path of the url of the request parameter
  let stats; //declares the stats variable
  try { //does this while there is no error
    stats = await stat(path); //wait until we get the information from the file
  } catch (error) { //exits try block if there was an error
    if (error.code != "ENOENT") throw error; //checks to see if the error is anything
    else return {status: 404, body: "File not found"}; //otherwise returns the file not found status
  }
  if (stats.isDirectory()) { //checks to see if the file is a directory
    return {body: (await readdir(path)).join("\n")}; //returns the files inside the file
  } else { //otherwise
    return {body: createReadStream(path), //returns the readable stream
            type: mime.getType(path)}; //installs a specific version of mime for the given file
  }
};

const {rmdir, unlink} = require("fs").promises; //get the rmdir, unlink functions from the fs promises

methods.DELETE = async function(request) { //initializes an async method with a request parameter
  let path = urlPath(request.url); //initializes the path variable to the url path of the url of the request parameter
  let stats; //declares the stats variable
  try { //does this while there is no error
    stats = await stat(path); //wait until we get the information from the file
  } catch (error) { //exits try block if there was an error
    if (error.code != "ENOENT") throw error; //checks to see if the error is anything
    else return {status: 204}; //otherwise returns the success status
  }
  if (stats.isDirectory()) await rmdir(path); //if the file is a directory, wait until the directory is removed
  else await unlink(path); //otherwise, wait until the file is removed
  return {status: 204}; //return the success status
};

const {createWriteStream} = require("fs"); //get the createWriteStream function from the fs module

function pipeStream(from, to) { //initializes a function to create a pipe stream
  return new Promise((resolve, reject) => { //returns a new promise
    from.on("error", reject); //returns an error stream if promise is rejected
    to.on("error", reject); //returns an error stream if promise is rejected
    to.on("finish", resolve); //returns a finish stream if promise is rejected
    from.pipe(to); //returns the pipe of the given promise results
  });
}

methods.PUT = async function(request) { //initializes an async method with a request parameter
  let path = urlPath(request.url); //initializes the path variable to the url path of the url of the request parameter
  await pipeStream(request, createWriteStream(path)); //waits for a pipe promise from the request to the write stream of the path
  return {status: 204}; //return the success status
};

const {mkdir} = require("fs").promises; //get the mkdir function from the fs promises

methods.MKCOL = async function(request) { //initializes an async method with a request parameter
  let path = urlPath(request.url); //initializes the path variable to the url path of the url of the request parameter
  let stats; //declares the stats variable
  try { //does this while there is no error
    stats = await stat(path); //wait until we get the information from the file
  } catch (error) { //exits try block if there was an error
    if (error.code != "ENOENT") throw error; //checks to see if the error is anything
    await mkdir(path); //waits until the file is made
    return {status: 204}; //returns the success status
  }
  if (stats.isDirectory()) return {status: 204}; //if the file is a directory, return the success status
  else return {status: 400, body: "Not a directory"}; //otherwise, return the not a directory status
};