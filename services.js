const request = require('request');
const stringSimilarity = require('string-similarity');

function getSong(query, next) {
    request('http://localhost:3000/song/getAllSongs', {json: true}, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        //console.log(body);
        body.forEach((song) => {
            // console.log(song.title);
            // console.log(query);
            // console.log(stringSimilarity.compareTwoStrings(query, song.title));
            if (stringSimilarity.compareTwoStrings(query.toLowerCase(), song.title.toLowerCase()) > 0.60) {
                next(song.link);
                return song;
            }
        });
    });
}

function getSongbyGenre(query, next) {
    request('http://localhost:3000/song/getAllSongs', {json: true}, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        //console.log(body);
        let playlist = [];
        body.forEach((song) => {
            if (stringSimilarity.compareTwoStrings(query.toLowerCase(), song.genre.toLowerCase()) > 0.80) {
                playlist.push(song.link);
            }
        });
        next(playlist);
    });
}

function getUsers() {
    request('http://localhost:3000/user/all', {json: true}, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        console.log(body);
    });
}

function getPlaylists() {
    request('http://localhost:3000/playlist/allPlaylist', {json: true}, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        console.log(body);
    });
}

function getByName(name) {
    request('http://localhost:3000/playlist/getByName?name=' + name, {json: true}, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        console.log(body);
    });
}

function insertUser(id, discordid) {
    request({
        headers: {
            'Accept': 'application/json',
            'Accept-Encoding': 'application/json',
            'Content-Type': 'application/json'
        },
        url: 'http://localhost:3000/user/ins',
        json: true,
        body: {username: id, discordid: discordid},
        method: 'POST'
    }, (err, res, body) => {
        console.log(body);
    });


}


function getUser(id) {
    request('http://localhost:3000/user/getByDiscordid?discordid=' + id, {json: true}, (err, res, body) => {
        if (err) {
            console.log(err);
        }
        console.log(body);
        return body;
    });

}

module.exports = {

    getSong,
    getUsers,
    getPlaylists,
    getByName,
    getUser,
    insertUser,
    getSongbyGenre


};