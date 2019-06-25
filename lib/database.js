const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/omdb", { useNewUrlParser: true });

var db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function() {
    console.log("We're connected!");
});

let database = {
    getAllMovies: function() {},
    saveMovie: function(movie) {},
    checkMovieExists: function(title) {},
    getMovieById: function(movieKey) {},
    deleteMovie: function(movieKey) {},
    updateMovie: function(movieKey, changedData){}
};

module.exports = database;
