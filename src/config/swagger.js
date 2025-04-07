const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// ✅ Define Swagger Options
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Movies APP",
            description: "API Documentation for the Movie Application",
            version: "1.0.0",
        },
        servers: [{ url: "http://localhost:5000" }],
        components: {
            schemas: {
                User: {
                    type: "object",
                    required: ["name", "email", "password", "confirmPassword"],
                    properties: {
                        id: { type: "integer", readOnly: true },
                        name: { type: "string" },
                        email: { type: "string" },
                        password: { type: "string" },
                        confirmPassword: { type: "string" }
                    }
                }
            }
        }
    },
    apis: ["./src/routes/*.js"] // ✅ Make sure this path is correct
};

// ✅ Generate Swagger Spec
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// ✅ Setup Swagger UI
const setupSwagger = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log("✅ Swagger API Docs available at: http://localhost:5000/api-docs");
};

module.exports = setupSwagger;