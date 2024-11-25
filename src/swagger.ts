import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Soil-Spaces API Documentation",
      version: "1.0.0",
      description: "API documentation for endpoints",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: [
    `${__dirname}/routes/*.js`,
    `${__dirname}/routes/*.ts`,
    `${__dirname}/swaggerjs`,
    `${__dirname}/swagger.ts`,
  ],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
export default swaggerDocs;
