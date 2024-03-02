const path = require("path");
const {readData} = require("../lib/readData")
const fs = require("fs/promises")
const GET = async (req, res) => {
    const posts = await readData("posts"); 
    if(req.searchParams){
        const store = []
        for (const post of posts) {
            let counter = 0;
            for (const key in req.searchParams) {
                if(post[key] == req.searchParams[key]) counter ++
            }
            if(Object.keys(req.searchParams).length == counter) store.push(post)
        }
        res.json(store)
    }else{
        res.json(posts)
    }
}
const POST = async (req, res) => {
    const newPost = await req.body;
    const posts = await readData("posts");
    if(!newPost.title && !newPost.body && !newPost.userId ){
        res.json({
            message: "Invalid post"
        })
    }else{
        posts.push(newPost);
        res.json({
            message: "The post has been created !",
            post: newPost
        })
        await fs.writeFile(path.join(__dirname, "..", "database", "posts.json"), JSON.stringify(posts, null, 4))
    }
}
module.exports = {GET, POST}