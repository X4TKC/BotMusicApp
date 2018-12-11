const request = require('request');

function getSongs(){
    request('http://localhost:3000/song/getAllSongs', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        console.log(body);
    });
}

module.exports = {
  getSongs
};