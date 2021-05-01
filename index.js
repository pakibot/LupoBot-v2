const fs = require("fs");
const { Collection, Client } = require("discord.js");
const { RichEmbed  } = require('discord.js');

const client = new Client();
client.commands = new Collection();
client.queue = new Map()

fs.readdir(__dirname + "/events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(__dirname + `/events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
    console.log("Evento caricato: "+eventName)
  });
});

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, props);
    console.log("Comando caricato: "+commandName)
  });
});

client.on("guildCreate", guild => {
	console.log("Sono entrato in: " + guild.name);
	client.channels.cache.get("731102904026660915").send(`Sono stato aggiunto a un nuovo server! Ora gestisco **${guild.memberCount}** membri in più!`);
});

const keepAlive = require('./server.js');
keepAlive();

//Logging in to discord
client.login('your_token')
