const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
const services = require('./services');
const ytdl = require('ytdl-core');
let dispatcher = null;
const streamOptions = {seek: 0, volume: 1};
let queue = [];
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
    } else if (directive[0] === '&Start') {
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
    } else if (directive[0] === '&Play') {
        let voiceChannel = msg.member.voiceChannel;
        
        if(services.getUser(msg.author.id)){
           console.log('user already exists')
            
        }else{
            services.insertUser(msg.author.username,msg.author.id);
            console.log("new user");
        }
        try {
            let query = "";
            directive.slice(1).forEach((word) => {
                query += word + " ";
            });
            voiceChannel.join().then(connection => {
                services.getSong(query, (url) => {
                    startStream(url);
                });
            }).catch(console.error);
        } catch (err) {
            msg.reply('No te encuentras en un canal D:');
        }
    } else if (directive[0] === '&enq') {
        let query = "";
        console.log('enqueued');
        directive.slice(1).forEach((word) => {
            query += word + " ";
        });
        services.getSong(query, (url) => {
            queue.push(url);
        });


    }else if (directive[0] === '&Genre') {
        let voiceChannel = msg.member.voiceChannel;
        try {
            let query = "";
            directive.slice(1).forEach((word) => {
                query += word + " ";
            });
            voiceChannel.join().then(connection => {
                services.getSongbyGenre(query, (playlist) => {
                    queue = playlist;
                    startStream(queue.shift());
                });
            }).catch(console.error);
        } catch (err) {
            msg.reply('No te encuentras en un canal D:');
        }
    }else if (directive[0] === '&Next') {
        try {
            dispatcher.end();
        } catch (err) {
            msg.reply('Atatau');
        }
     } //else if (msg.content === 'lolis') {
    //
    //     let voiceChannel = msg.member.voiceChannel;
    //     voiceChannel.join().then(connection => {
    //         const stream = ytdl('https://www.youtube.com/watch?v=b8i921cgWwE', {filter: 'audioonly'});
    //         dispatcher = connection.playStream(stream, {seek: 0, volume: 10});
    //         dispatcher.on("end", end => {
    //             console.log("left channel");
    //             voiceChannel.leave();
    //         });
    //     }).catch(console.error);
    // } else if (msg.content === 'crabs') {
    //
    //     let voiceChannel = msg.member.voiceChannel;
    //     voiceChannel.join().then(connection => {
    //         const stream = ytdl('https://www.youtube.com/watch?v=eqSf5Tj7YaA', {filter: 'audioonly'});
    //         dispatcher = connection.playStream(stream, {seek: 0, volume: 1});
    //         dispatcher.on("end", end => {
    //             console.log("left channel");
    //             voiceChannel.leave();
    //         });
    //     }).catch(console.error);
    // }
});

function startStream(url) {
    console.log('stream playing');
    const stream = ytdl(url, {filter: 'audioonly'});
    if (dispatcher == null) {
        dispatcher = client.voiceConnections.first().playStream(stream, streamOptions);
        dispatcher.on("end", end => {
            playNext();
        });
    } else {
        dispatcher = client.voiceConnections.first().playStream(stream, streamOptions);
        dispatcher.on("end", end => {
            playNext();
        });
    }
}

function playNext() {
    console.log(queue.length);
    if (queue.length === 0) {
        console.log('should stop stream');
        client.voiceConnections.first().disconnect();
    } else {
        startStream(queue.shift());
    }
}

client.login(auth.token);