require("dotenv").config();
let keys = require("./keys");
let axios = require("axios");
let moment = require("moment"); 

let spotifyKeys = keys.spotify;
var Spotify = require('node-spotify-api');
var spotify = new Spotify({
  id: spotifyKeys.id,
  secret: spotifyKeys.secret
})
// spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//   if (err) {
//     return console.log('Error occurred: ' + err);
//   }
 
// console.log(data); 
// })


let command = process.argv[2];
let userInput = process.argv.slice(3).join(" ");
let divider = "\n------------------------------------------------------------\n\n"

switch(command){

  case "concert-this":
    console.log(`${command} - ${userInput}`);

    let bandsUrl = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp"

    axios.get(bandsUrl)
      .then(function(response){

        console.log(response.data[0].venue.name);
        console.log(response.data[0].datetime)
        console.log()
        
        for(i=0; i<response.data.length; i++){

          console.log("Concert Venue: "+response.data[i].venue.name)
          console.log(`Concert Location: ${response.data[i].venue.city}, ${response.data[i].venue.region} ${response.data[i].venue.country}`)
          console.log("Concert Date: "+moment(response.data[i].datetime).format( "MM/DD/YYYY"));
          console.log(divider)

        }

      })

    break;

  case "spotify-this-song":
    console.log(`${command} - ${userInput}`)

    spotify.search({ type: 'track', query: userInput }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
     
    // console.log(data.tracks.items[0].artists[0].name)
    // console.log(data.tracks.items[0].name)
    // console.log(data.tracks.items[0].preview_url)
    // console.log(data.tracks.items[0].album.name)

    for(i=0; i<data.tracks.items.length; i++){

      //artists for loop
      let artists = "";
      let artistsArray = [];
      for(j=0; j<data.tracks.items[i].artists.length; j++){
        artistsArray.push(data.tracks.items[i].artists[j].name)
      }
      artists = artistsArray.join(", ");

      //console log
      console.log(`Track Artists: ${artists}`);
      console.log(`Track Name: ${data.tracks.items[i].name}`);
      console.log(`Track Preview: ${data.tracks.items[i].preview_url}`);
      console.log(`Track Album Name: ${data.tracks.items[i].album.name}`);

      
      console.log(divider)
    }

    })
    
    break;

  case "movie-this":
    console.log(`${command} - ${userInput}`)
    break;

  case "do-what-it-says":
    console.log(`${command} - ${userInput}`)
    break;
}

// console.log(spotifyKeys)

// ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")