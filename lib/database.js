const _ = require('lodash');
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
    saveMovie: function(movie) {
        let data = {
            "actors": "",
            "awards": "",
            "country": "",
            "director": "",
            "genre": "",
            "imdbRating": "",
            "language": "",
            "plot": "",
            "poster": "",
            "rated": "",
            "released": "",
            "runtime": "",
            "title": "",
        };

        // Convert movie attributes names to camelCase. Note: it is not recursive.
        let normalizedData = _.mapKeys(movie, (value, key) => _.camelCase(key));
        for (prop in data) {
            data[prop] = normalizedData[prop];
        }

        console.log(data);

        let newMovie = new Movie(data);
        return new Promise((resolve, reject) => {
            newMovie.save(function(err, newMovie) {
                if (err) reject(err);
                resolve(newMovie);
            });
        });
    },
    checkMovieExists: function(title) {},
    getMovieById: function(movieKey) {
        return new Promise((resolve, reject) => {
            Movie.findById(movieKey, function (err, movie) {
                if (err) reject(err);
                resolve(movie);
            });
        });
    },
    deleteMovie: function(movieKey) {},
    updateMovie: function(movieKey, changedData){}
};

module.exports = database;
