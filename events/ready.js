 module.exports = async (client) => {
     console.log(`Online by @DavidCavallaro on GitHub`);
 
   let status = [
       {name: `l!help per i comandi`, type: 'PLAYING'},
       {name: `online by Aboutpaki`, type: 'PLAYING'},
    ]
    function setStatus(){
      let randomStatus = status[Math.floor(Math.random()*status.length)]
        client.user.setPresence({activity: randomStatus})
    }
    ''    setStatus();
    setInterval(() => setStatus(), 20000)
};
