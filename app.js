const Spotify = require("node-spotify-api");
const omdb = require("omdb-client");
const axios = require("axios");

require("dotenv").config();
// console.log(process.env.SPOTIFY_ID);

let spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET,
})

let action = process.argv[2];
let command = process.argv.splice(3).join(" ");
// console.log(command, action);

if (action === "spotify") {
    console.log("spotify search: ", command);
    spotify.search({
        query: command,
        type: "track",
        limit: 1
    }, (error, data) => {
        // console.log(data.tracks.items[0]);
        console.log({
            artist: data.tracks.items[0].artists[0].name,
            song: data.tracks.items[0].name,
            album: data.tracks.items[0].album.name,
            url: data.tracks.items[0].artists[0].href
        });

    })
} else if (action === "omdb") {
    console.log("omdb search: ", command);
    omdb.get({
        apiKey: process.env.OMDB_KEY,
        title: command
    }, (error, data) => {
        // console.log(data);
        console.log({
            title: data.Title,
            year: data.Year,
            rating: data.imdbRating,
            location: data.Country,
            langusage: data.Language,
            plots: data.Plot,
            actors: data.Actors
        });

    })
} else {
    console.log("no results");
}

