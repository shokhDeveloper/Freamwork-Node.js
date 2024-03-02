const { Express } = require("./lib/routes");
const {  PORT, host } = require("./lib/network");
const userController = require("./controller/user.js")
const postsController = require("./controller/post.js")
const express = new Express();
express.request("/users", userController.GET);
express.post("/users", userController.POST )
express.request("/posts", postsController.GET );
express.post("/posts", postsController.POST )
express.listen(PORT, () => {
  console.log(`Server is running ${host}`);
});