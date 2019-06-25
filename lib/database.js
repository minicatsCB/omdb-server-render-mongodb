const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/omdb", { useNewUrlParser: true });

var db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function() {
    console.log("We're connected!");
});

let movieSchema = new mongoose.Schema({
    actors: String,
    awards: String,
    country: String,
    director: String,
    genre: String,
    imdbRating: String,
    language: String,
    plot: String,
    poster: String,
    rated: String,
    released: String,
    runtime: String,
    title: String,
});

let Movie = mongoose.model('Movie', movieSchema);

let database = {
    getAllMovies: function() {
        return new Promise((resolve, reject) => {
            Movie.find(function(err, movies) {
                if (err) reject(err);
                console.log(movies);
                resolve(movies);
            });
        });
    },
    saveMovie: function(movie) {},
    checkMovieExists: function(title) {},
    getMovieById: function(movieKey) {},
    deleteMovie: function(movieKey) {},
    updateMovie: function(movieKey, changedData){}
};

module.exports = database;
