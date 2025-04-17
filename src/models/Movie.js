const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Import your DB connection

const Movie = sequelize.define('Movie', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    imageResId: {
        type: DataTypes.STRING, // Assuming it’s a path/URL to the image
        allowNull: false
    },
    rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0
    },
    isWishlisted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    userRating: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0
    },
    trailerUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isFavourite: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'movies',
    timestamps: true
});

module.exports = Movie;
