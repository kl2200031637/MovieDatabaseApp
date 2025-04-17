const Movie = require("../models/Movie");

// Create a new movie
exports.createMovie = async (req, res) => {
    try {
        const {
            title,
            description,
            imageResId,
            rating,
            isWishlisted,
            userRating,
            trailerUrl,
            isFavourite
        } = req.body;

        if (!title || !description || !imageResId) {
            return res.status(400).json({ error: "Title, description, and imageResId are required" });
        }

        const movie = await Movie.create({
            title,
            description,
            imageResId,
            rating,
            isWishlisted,
            userRating,
            trailerUrl,
            isFavourite
        });

        res.status(201).json({ message: "Movie created successfully", movie });
    } catch (error) {
        console.error("Error creating movie:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get all movies
exports.getMovies = async (req, res) => {
    try {
        const movies = await Movie.findAll();
        res.status(200).json({ message: "Movies retrieved successfully", movies });
    } catch (error) {
        console.error("Error fetching movies:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get movie by ID (optional)
exports.getMovieById = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findByPk(id);

        if (!movie) return res.status(404).json({ error: "Movie not found" });

        res.status(200).json(movie);
    } catch (error) {
        console.error("Error fetching movie:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Update movie
exports.updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            title,
            description,
            imageResId,
            rating,
            isWishlisted,
            userRating,
            trailerUrl,
            isFavourite
        } = req.body;

        const movie = await Movie.findByPk(id);
        if (!movie) return res.status(404).json({ error: "Movie not found" });

        await movie.update({
            title,
            description,
            imageResId,
            rating,
            isWishlisted,
            userRating,
            trailerUrl,
            isFavourite
        });

        res.status(200).json({ message: "Movie updated successfully", movie });

    } catch (error) {
        console.error("Error updating movie:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Delete movie
exports.deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findByPk(id);
        if (!movie) return res.status(404).json({ error: "Movie not found" });

        await movie.destroy();
        res.status(200).json({ message: "Movie deleted successfully" });
    } catch (error) {
        console.error("Error deleting movie:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
