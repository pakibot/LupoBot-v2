require("dotenv").config();
const fs = require("fs");
const { Collection, Client } = require("discord.js");
const fetch = require('node-fetch');
const got = require('got');
const { RichEmbed  } = require('discord.js');

const client = new Client();
client.commands = new Collection();
client.queue = new Map()
client.config = {
  prefix: process.env.PREFIX,
	prefix: 'c!'
}
client.cooldown = new Set();
client.cooldownTime = 3000;

client.giveawaysManager.on("giveawayReactionAdded", (giveaway, member, reaction) => {
    console.log(`${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
});

client.giveawaysManager.on("giveawayReactionRemoved", (giveaway, member, reaction) => {
    console.log(`${member.user.tag} unreact to giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
});

client.giveawaysManager.on("giveawayEnded", (giveaway, winners) => {
    console.log(`Giveaway #${giveaway.messageID} ended! Winners: ${winners.map((member) => member.user.username).join(', ')}`);
});

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

const keepAlive = require('./server.js');
keepAlive();

client.login(process.env.TOKEN)