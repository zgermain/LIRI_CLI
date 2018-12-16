require("dotenv").config();
let keys = require("./keys");
let axios = require("axios");
let moment = require("moment"); 
let fs = require("fs");

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


let divider = "\n------------------------------------------------------------\n\n"

let  command = process.argv[2];
let userInput = process.argv.slice(3).join(" ");



function concertThis(query){
  let bandsUrl = "https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp"

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
}

function spotifyThis(query){
  spotify.search({ type: 'track', query: query }, function(err, data) {
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
}

function movieThis(query){
  let movieUrl = `http://www.omdbapi.com/?t=${query}&y=&plot=short&apikey=trilogy`

  axios.get(movieUrl).then(function(response){

    console.log(`Movie Title: ${response.data.Title}`);
    console.log(`Movie Year: ${response.data.Year}`);
    // console.log(`IMDB Rating: ${response.data.Ratings[0].Value}`)



    for(i=0; i<response.data.Ratings.length; i++){

      if (response.data.Ratings[i].Source === "Internet Movie Database"){
        console.log(`IMDB Rating: ${response.data.Ratings[i].Value}`)
      };

      if (response.data.Ratings[i].Source === "Rotten Tomatoes"){
        console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[i].Value}`)
      };
      
    }

    
    console.log(`Movie Country: ${response.data.Country}`);
    console.log(`Movie Language: ${response.data.Language}`);
    console.log(`Movie Plot: ${response.data.Plot}`);
    console.log(`Movie Actors: ${response.data.Actors}`);
    console.log(divider);
  }).catch(function(error) {
    console.log(error);
  });
}


switch(command){

  case "concert-this":
    console.log(`${command} - ${userInput}`);

    concertThis(userInput);

    break;

  case "spotify-this-song":

  if (!userInput){
    userInput = "I saw the sign"
  };

    console.log(`${command} - ${userInput}`)

    spotifyThis(userInput);
    
    break;

  case "movie-this":
  if (!userInput){
    userInput = "Mr. Nobody"
  };

    console.log(`${command} - ${userInput}`)

    movieThis(userInput);

    break;

  case "do-what-it-says":
    
    console.log(this)

    fs.readFile("random.txt","utf8",function(error,data){
      if (error) {
        return console.log(error);
      }
  
      let random = data.split(",");
      command = random[0];
      userInput = random[1];
      console.log(command);
      console.log(userInput);
        
      if (command === "spotify-this-song"){
        spotifyThis(userInput);
      };
      if (command === "movie-this"){
        movieThis(userInput);
      };
      if (command === "concert-this"){
        concertThis(userInput);
      };
    })

  

    break;
}

// console.log(spotifyKeys)

// ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")