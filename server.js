const express = require("express");
const app = express();
const port = 3000;

const controller = require("./lib/controller.js");

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({
    extended: false
}));

app.get("/", (req, res) => {
    let movies = controller.getAllMovies().then(movies => {
        res.render("index", {
            movies: movies
        });
    });
});

app.get("/create", (req, res) => {
    controller.saveMovie(req.query.title).then(movie => {
        if (movie) {
            res.render("index", {
                movies: [movie]
            });
        } else {
            res.redirect("/");
        }
    });
});

app.get("/movie/:id", (req, res) => {
    let movie = controller.getMovieById(req.params.id).then(movie => {
        res.render("movie", {
            movie: movie,
            isEditOn: false
        });
    });
});

app.post("/movie/:id/delete", (req, res) => {});

app.get("/movie/:id/edit", (req, res) => {});

app.post("/movie/:id/update", (req, res) => {});

app.listen(port, () => console.log("Listening on port " + port));
