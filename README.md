# LIRI_CLI

Kind of like "Siri" but but without the delightful voice

## How to use LIRI

### Concert-This

To look up concert info on a band of your choice, type "concert-this" then the name of the band or artist:

```
node liri.js concert-this Weezer
```

### Spotify-This-Song

To look up information on a song in Spotify, type "spotify-this-song" and then the name of the track:

```
node liri.js spotify-this-song Band on the Run
```

### Movie-This

To look up information on a movie in OMDB, type "movie-this" and then the name of the movie:

```
node liri.js movie-this Batman Begins
```

### Do-What-It-Says

Using the random.txt file in the same directory, you can assign a specific command and input to Liri. If you change the command and input in the random.txt file (for example: spotify-this-song,Thriller) and then type "do-what-it-says", Liri will run the command and input from the random.txt file:

```
node liri.js do-what-it-says
```


