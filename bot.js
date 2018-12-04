const Discord = require('discord.js');
const client = new Discord.Client();
var auth = require('./auth.json');
const ytdl = require('ytdl-core');
const streamOptions = {seek: 0, volume:1};

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
  else if (msg.content === 'Hola') {
    msg.reply('Hola chitos!');
  }
  else if (msg.content === 'Pewdiepie') {
 
    let voiceChannel=msg.member.voiceChannel;
    voiceChannel.join().then(connection => {
        const stream = ytdl('https://www.youtube.com/watch?v=6Dh-RL__uN4', { filter : 'audioonly' });
        const dispatcher = connection.playStream(stream, streamOptions);
    }).catch(console.error);
    }
});

client.login(auth.token);