const express = require("express");
const sequelize = require("./src/config/db"); // Import database
const User = require("./src/models/User"); // Ensure models are loaded
const authRoutes = require("./src/routes/authRoutes");
const setupSwagger = require("./src/config/swagger");
const profileRoutes = require("./src/routes/profileRoutes");

require("dotenv").config();

const app = express();
app.use(express.json());

// ✅ Setup Swagger API Docs
setupSwagger(app);

// ✅ Register Routes
app.use("/auth", authRoutes);
app.use("/userprofile", profileRoutes);

app.get("/", (req, res) => {
    res.send("Hello");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    try {
        await sequelize.sync({ alter: true }); // ✅ Ensure tables are created
        console.log(`✅ Server running on https://moviedatabaseapp-production.up.railway.app/`);
    } catch (error) {
        console.error("❌ Error syncing database:", error);
    }
});