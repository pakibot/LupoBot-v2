module.exports = async (client) => {
    console.log(`Online by @DavidCavallaro on GitHub`);
    
    let status = [
        {name: `!help for info`, type: 'PLAYING'},
        {name: `Online by @DavidCavallaro on GitHub`, type: 'PLAYING'},
    ]
    function setStatus(){
        let randomStatus = status[Math.floor(Math.random()*status.length)]
        client.user.setPresence({activity: randomStatus})
    }
    setStatus();
    setInterval(() => setStatus(), 20000)
  };