const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
const services = require('./services');
const ytdl = require('ytdl-core');
const streamOptions = {seek: 0, volume: 1};

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    let directive = msg.content.split(" ");
    if (msg.content === 'ping') {
        msg.reply('Pong!');
       // services.getSong();
    } else if (msg.content === 'Hola') {

        
        msg.reply('Hola chitos!');
        services.getPlaylists();
    } else if (msg.content === 'Pewdiepie') {

        let voiceChannel = msg.member.voiceChannel;
        voiceChannel.join().then(connection => {
            const stream = ytdl('https://www.youtube.com/watch?v=6Dh-RL__uN4', {filter: 'audioonly'});
            const dispatcher = connection.playStream(stream, streamOptions);
        }).catch(console.error);
    } else if (msg.content === 'Dinero') {
        msg.reply('No abusen mierda D:');
    } else if (msg.content === 'Do it') {
        let voiceChannel = msg.member.voiceChannel;
        voiceChannel.join().then(connection => {
            const stream = ytdl('https://www.youtube.com/watch?v=7AnoagDv8Qo', {filter: 'audioonly'});
            const dispatcher = connection.playStream(stream, streamOptions);
        }).catch(console.error);
    } else if (msg.content === 'Surprise') {

        let voiceChannel = msg.member.voiceChannel;
        voiceChannel.join().then(connection => {
            const stream = ytdl('https://www.youtube.com/watch?v=ca-e5MrVbVU', {filter: 'audioonly'});
            const dispatcher = connection.playStream(stream, streamOptions);
        }).catch(console.error);
    } else if (msg.content === 'Dt2') {

        let voiceChannel = msg.member.voiceChannel;
        voiceChannel.join().then(connection => {
            const stream = ytdl('https://www.youtube.com/watch?v=1HVv2saWOl0', {filter: 'audioonly'});
            const dispatcher = connection.playStream(stream, streamOptions);
            dispatcher.on("end", end => {
                console.log("left channel");
                voiceChannel.leave();
            });
        }).catch(console.error);
    } else if (msg.content === 'RIP') {

        let voiceChannel = msg.member.voiceChannel;

        try {
            voiceChannel.leave();
        } catch (err) {

        }
        msg.reply('Ya me fui ):');
    } else if (msg.content === 'Fuck') {
        msg.reply('Oye malcriado');
    } else if (msg.content === 'Hentai') {
        msg.reply('Eso no es cristiano!');
    } else if (msg.content === 'Free Real Estate') {

        let voiceChannel = msg.member.voiceChannel;
        try {
            voiceChannel.join().then(connection => {
                const stream = ytdl('https://www.youtube.com/watch?v=WB5R5xsmcYg', {filter: 'audioonly'});
                const dispatcher = connection.playStream(stream, streamOptions);
            }).catch(console.error);
        } catch (err) {
            msg.reply('No te encuentras en un canal D:');
        }
    }else if(directive[0] === '&Start'){
        let voiceChannel = msg.member.voiceChannel;
        try {
            voiceChannel.join().then(connection => {
                const stream = ytdl(directive[1], {filter: 'audioonly'});
                const dispatcher = connection.playStream(stream, streamOptions);
                dispatcher.on("end", end => {
                    console.log("left channel");
                    voiceChannel.leave();
                });
            }).catch(console.error);
        } catch (err) {
            msg.reply('No te encuentras en un canal D:');
        }
    }else if(directive[0] === '&Play'){
        let voiceChannel = msg.member.voiceChannel;

        try {
            let query = "";
            directive.slice(1).forEach((word) => {
                query += word + " ";
            });
            voiceChannel.join().then(connection => {
                services.getSong(query, (url) => {
                    console.log('stream playing');
                    const stream = ytdl(url, {filter: 'audioonly'});
                    const dispatcher = connection.playStream(stream, streamOptions);
                    dispatcher.on("end", end => {
                        console.log("left channel");
                        voiceChannel.leave();
                    });
                });
            }).catch(console.error);
        } catch (err) {
            msg.reply('No te encuentras en un canal D:');
        }
    }
});

client.login(auth.token);