const os = require("os");
const networkInterface = os.networkInterfaces();
let IP_ADRESS = ''
const PORT = process.env.PORT || 5000
if(networkInterface['Беспроводная сеть 3']){
    IP_ADRESS = networkInterface["Беспроводная сеть 3"].find((item) => item.family == "IPv4").address
}
const host = `http://${IP_ADRESS ? IP_ADRESS : "localhost"}:${PORT}`
module.exports = {IP_ADRESS,  PORT, host}