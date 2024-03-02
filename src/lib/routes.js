const http = require("http");
const handler = {};
const Server = (req, res) => {
  const SERVER_URL = new URL(req.url, `http://${req.headers.host}`);
  let searchParams = Object.fromEntries(SERVER_URL.searchParams.entries());
  const reqUrl = SERVER_URL.pathname.toLowerCase();
  const reqMethod = req.method.toUpperCase();
  if(handler[reqUrl]){
    if(reqMethod == "POST"){
      let newData = ''
      req.body = new Promise((resolve, reject) => {
        req.on("data", (buffer) => newData += buffer )
        req.on("end",  () => {
          newData = newData ? JSON.parse(newData): {};
          if(newData){
            resolve(newData)
          }else{
            reject("XATOLIK")
          }
        })
      })
    }
  }
  req.searchParams = Object.keys(searchParams).length ? searchParams : null;
  res.json = function (data) {
    res.setHeader("Content-type", "application/json");
    res.end(JSON.stringify(data));
  };
  res.render = function(path){
    res.setHeader("Content-Type", "text/html");
    res.end(path)
  }
  if (handler[reqUrl]) {
    handler[reqUrl][reqMethod](req, res);
  } else {
    res.end("Not found");
  }
};
class Express {
  constructor() {
    this.server = http.createServer(Server);
    this.request = function (path, callBackHandler, method) {
      const reqUrl = path.toLowerCase()
      handler[reqUrl] = handler[reqUrl] || {};
      handler[reqUrl][!method ? "GET" : method] = callBackHandler;
    }
    this.post = function(path, callBackHandler){
      const reqUrl = path.toLowerCase()
      handler[reqUrl] = handler[reqUrl] || {};
      handler[reqUrl]["POST"] = callBackHandler 
    }
    this.listen = function (PORT, callBackHandler) {
      this.server.listen(PORT, callBackHandler);
    };
  }
}
module.exports = { Express };
