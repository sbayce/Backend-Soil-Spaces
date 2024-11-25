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
    components: {
      schemas: {
        Space: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            name: { type: "string" },
            type: { $ref: "#/components/schemas/SpaceType" },
            capacity: { type: "integer" },
            pricePerHour: { type: "number", format: "float" },
            availability: { type: "boolean" },
            bookings: {
              type: "array",
              items: { $ref: "#/components/schemas/Booking" },
            },
          },
        },
        TimeSlot: {
          type: "object",
          properties: {
            id: { type: "integer" },
            startTime: { type: "string" },
            endTime: { type: "string" },
            bookings: {
              type: "array",
              items: { $ref: "#/components/schemas/Booking" },
            },
          },
        },
        Booking: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            userName: { type: "string" },
            userEmail: { type: "string", format: "email" },
            space: { $ref: "#/components/schemas/Space" },
            spaceId: { type: "string", format: "uuid" },
            user: { $ref: "#/components/schemas/User" },
            userId: { type: "string", format: "uuid" },
            date: { type: "string", format: "date-time" },
            timeSlot: { $ref: "#/components/schemas/TimeSlot" },
            timeSlotId: { type: "integer" },
            status: { $ref: "#/components/schemas/BookingStatus" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        User: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            name: { type: "string" },
            email: { type: "string", format: "email" },
            password: { type: "string" },
            role: { $ref: "#/components/schemas/UserRole" },
            bookings: {
              type: "array",
              items: { $ref: "#/components/schemas/Booking" },
            },
          },
        },
        SpaceType: {
          type: "string",
          enum: ["PRIVATE_OFFICE", "MEETING_ROOM", "HOT_DESK"],
        },
        BookingStatus: {
          type: "string",
          enum: ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"],
        },
        UserRole: {
          type: "string",
          enum: ["ADMIN", "MEMBER"],
        },
      },
    },
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
