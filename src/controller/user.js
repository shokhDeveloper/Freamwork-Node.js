const fs = require("fs/promises")
const path = require("path")
const {readData} = require("../lib/readData")
const POST = async (req, res) => {
  const { name, age, gender } = await req.body;
  const users = await readData("users");
  if (!name && !age && !gender) {
    res.json({
      status: 500,
      message: "Server error",
    });
  } else {
    users.push({ name, age, gender });
    await fs.writeFile(
      path.join(__dirname, "database", "users.json"),
      JSON.stringify(users, null, 4)
    );
    res.json({
      status: 201,
      message: "The user has been created!",
      user: { name, age, gender },
    });
  }
};
const GET = async (req, res) => {
  const users = await readData("users");
  if (req.searchParams) {
    const store = [];
    for (const user of users) {
      let counter = 0;
      for (const searchParam in req.searchParams) {
        if (user[searchParam] == req.searchParams[searchParam]) counter++;
      }
      if (Object.keys(req.searchParams).length == counter) store.push(user);
    }
    res.json(store);
  } else {
    res.json(users);
  }
};
module.exports = {GET, POST}