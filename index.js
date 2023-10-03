const http = require("http");
const fs = require("fs")

function requestHandler (req, res) {
  if(req.url === "/style.css"){
    fs.readFile("./style.css", "utf8", (err, data) => {
      res.writeHead(200, {'Content-Type': 'text/css'})
      res.end(data)
    })
  }

  const reqPath = (req.url === "/") ? "./index.html" : "."+req.url+".html";
  fs.readFile(reqPath, "utf8", (err, data) => {
    if(err){
      fs.readFile("./404.html", "utf8", (err, data) => {
        res.writeHead(404, {'Content-Type': 'text/html'})
        res.end(data)
      })
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'})
      res.end(data)
    }

  })
}

http.createServer(requestHandler).listen(3000, () =>  console.log("Server listening in port 3000"))