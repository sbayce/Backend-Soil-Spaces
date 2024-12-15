import express from 'express'
import dotenv from 'dotenv'
import { PrismaClient, UserRole } from '@prisma/client';
import cors from "cors";
import * as bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { spaceRouter } from './routes/space';
import { authRouter } from './routes/auth';
import { bookingRouter } from './routes/booking';
import { timeslotRouter } from './routes/timeslot';
import { interestRouter } from './routes/interest';
import swaggerUi from "swagger-ui-express";
import swaggerDocs from './swagger';

declare global {
    namespace Express {
      interface Request {
        context: {
          prisma: PrismaClient;
        };
        userId?: string;
        userRole?: UserRole
      }
    }
}

dotenv.config()
const app = express()
app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
    })
  );
  
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use((req, res, next) => {
    req.context = {
      prisma: new PrismaClient(),
    };
    next();
  });

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/auth', authRouter)
app.use('/space', spaceRouter)
app.use('/booking', bookingRouter)
app.use('/timeslot', timeslotRouter)
app.use('/interest', interestRouter)

app.get('/', (req, res) => {
    res.send("test")
});

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})