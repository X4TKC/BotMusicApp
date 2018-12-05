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
    else if (msg.content === 'Dinero') {
      msg.reply('No abusen mierda D:');
    }
    else if (msg.content === 'Do it') {
 
      let voiceChannel=msg.member.voiceChannel;
      voiceChannel.join().then(connection => {
          const stream = ytdl('https://www.youtube.com/watch?v=7AnoagDv8Qo', { filter : 'audioonly' });
          const dispatcher = connection.playStream(stream, streamOptions);
      }).catch(console.error);
    }
    else if (msg.content === 'Surprise') {
 
        let voiceChannel=msg.member.voiceChannel;
        voiceChannel.join().then(connection => {
            const stream = ytdl('https://www.youtube.com/watch?v=ca-e5MrVbVU', { filter : 'audioonly' });
            const dispatcher = connection.playStream(stream, streamOptions);
        }).catch(console.error);
    }
    else if (msg.content === 'Dt2') {
 
      let voiceChannel=msg.member.voiceChannel;
      voiceChannel.join().then(connection => {
          const stream = ytdl('https://www.youtube.com/watch?v=1HVv2saWOl0', { filter : 'audioonly' });
          const dispatcher = connection.playStream(stream, streamOptions);
      }).catch(console.error);
    }
    else if (msg.content === 'RIP') {
 
      let voiceChannel=msg.member.voiceChannel;
      
      try{
        voiceChannel.leave();
      }
      catch(err){
        
      }
      msg.reply('Ya me fui ):');
  }
  else if (msg.content === 'Fuck') {
    msg.reply('Oye malcriado');
  }
  else if (msg.content === 'Hentai') {
    msg.reply('Eso no es cristiano!');
  }
  else if (msg.content === 'Free Real Estate') {
    
    let voiceChannel=msg.member.voiceChannel;
    try{
    voiceChannel.join().then(connection => {
        const stream = ytdl('https://www.youtube.com/watch?v=WB5R5xsmcYg', { filter : 'audioonly' });
        const dispatcher = connection.playStream(stream, streamOptions);
    }).catch(console.error);
    }
    catch(err){
    msg.reply('Unite a un canal carajo D:');
    }
  }

});

client.login(auth.token);