//This is a method of keeping the bot online via UptimeRobot
const express = require('express');
const server = express();

server.all('/', (req, res)=>{
    res.send(`Status: \nonline`)
})
function keepAlive(){
    server.listen(3000, ()=>{console.log("UptimeRobot Host Bot ready!")});
}

module.exports = keepAlive;