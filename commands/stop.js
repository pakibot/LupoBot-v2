const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  name: "stop",
	async run (client, message, args) {
    const channel = message.member.voice.channel
    if (!channel)return sendError("You are not in a voice channel!", message.channel);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)return sendError("There is nothing playing!", message.channel);
   	if(!serverQueue.connection)return
	if(!serverQueue.connection.dispatcher)return
    try{
      serverQueue.connection.dispatcher.end();
    } catch (error) {
        message.guild.me.voice.channel.leave();
        message.client.queue.delete(message.guild.id);
        return sendError(`Error: ${error}`, message.channel);
    }
    message.client.queue.delete(message.guild.id);
    serverQueue.songs = [];
    message.react("⏹")
  },
}