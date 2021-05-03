const { play } = require("../util/playing");
const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const yts = require("yt-search");
const sendError = require("../util/error");

module.exports = {
    name: "play",
    run: async function (client, message, args) {
        let channel = message.member.voice.channel;
        if (!channel)return sendError("I'm sorry but you need to be in a voice channel to play music!", message.channel);
        
        const permissions = channel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT"))return sendError("I cannot connect to your voice channel, make sure I have the proper permissions!", message.channel);
        if (!permissions.has("SPEAK"))return sendError("I cannot speak in this voice channel, make sure I have the proper permissions!", message.channel);

        var searchString = args.join(" ");
        if (!searchString)return sendError("You didn't poivide want i want to play", message.channel);
   	    const url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : "";
   	    var serverQueue = message.client.queue.get(message.guild.id);

        let songInfo = null;
        let song = null;
        if (url.match(/^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi)) {
        try {
            songInfo = await ytdl.getInfo(url)
            if(!songInfo)return sendError("Looks like i was unable to find the song on YouTube", message.channel);
      	    song = {
       	    id: songInfo.videoDetails.videoId,
       	    title: songInfo.videoDetails.title,
       	    url: songInfo.videoDetails.video_url,
       	    img: songInfo.player_response.videoDetails.thumbnail.thumbnails[0].url,
      	    duration: songInfo.videoDetails.lengthSeconds,
      	    ago: songInfo.videoDetails.publishDate,
      	    views: String(songInfo.videoDetails.viewCount).padStart(10, ' '),
      	    req: message.author
            };
        } catch (error) {
            console.error(error);
            return message.reply(error.message).catch(console.error);
        }
        } 
    }