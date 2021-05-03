const Discord = require('discord.js');
 
module.exports = {
  name: "help",
  async run (client, message, args) {
  	const help = new Discord.MessageEmbed()
  		.setColor('7fe0f7')
	  	.setTitle('**Comandi**')
		.setTimestamp()
  		.addFields(`Lista comandi:\n\nUtilizza **l!help** per vedere la lista.`)
	  message.channel.send(help)
	}
}
