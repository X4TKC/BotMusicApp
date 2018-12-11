const request = require('request');
const stringSimilarity = require('string-similarity');

function getSong(query, next){
    request('http://localhost:3000/song/getAllSongs', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        //console.log(body);
        body.forEach((song) => {
            console.log(song.title);
            console.log(query);
            if (stringSimilarity.compareTwoStrings(query, song.title) > 0.60) {
                next(song.link);
                return song;
            }
        });
    });
}

module.exports = {
  getSong
};