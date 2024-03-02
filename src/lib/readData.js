const fs = require("fs/promises")
const path = require("path")
const readData = async (fileName) => {
    let getData = await fs.readFile(path.join(__dirname, "..", "database", `${fileName}.json`), "utf-8")
    getData = getData ? JSON.parse(getData): []
    return getData
}
module.exports = {readData}