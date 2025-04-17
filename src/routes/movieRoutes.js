const express = require("express");
const { createMovie, getMovies, updateMovie, deleteMovie } = require("../controllers/MovieController");
const upload = require("../middleware/movieMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Movie management
 */

/**
 * @swagger
 * /movies/create:
 *   post:
 *     summary: Create a new movie
 *     description: Adds a new movie to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Inception
 *               description:
 *                 type: string
 *                 example: A mind-bending thriller
 *               imageResId:
 *                 type: string
 *                 example: /uploads/movies/inception.jpg
 *               rating:
 *                 type: number
 *                 example: 4.8
 *               isWishlisted:
 *                 type: boolean
 *               userRating:
 *                 type: number
 *               trailerUrl:
 *                 type: string
 *                 example: https://youtube.com/inception-trailer
 *               isFavourite:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Movie created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/create", upload.single("movieImage"), createMovie);

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Get all movies
 *     description: Fetches the list of all movies.
 *     responses:
 *       200:
 *         description: Movies retrieved successfully
 *       500:
 *         description: Internal server error
 */
router.get("/movies", getMovies);

/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     summary: Update an existing movie
 *     description: Updates movie details by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the movie to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               imageResId:
 *                 type: string
 *               rating:
 *                 type: number
 *               isWishlisted:
 *                 type: boolean
 *               userRating:
 *                 type: number
 *               trailerUrl:
 *                 type: string
 *               isFavourite:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Movie updated successfully
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Internal server error
 */
router.put("/movies/:id",upload.single("MovieImage"), updateMovie);

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Delete a movie
 *     description: Deletes a movie by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the movie to delete
 *     responses:
 *       200:
 *         description: Movie deleted successfully
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Internal server error
 */
router.delete("/movies/:id", deleteMovie);

module.exports = router;
