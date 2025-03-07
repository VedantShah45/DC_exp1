// Import required modules
import express from 'express';
import cors from 'cors'; 
import dotenv from "dotenv"
import { dbConnect } from './db/dbConnect.ts';
import 'colors';
import authRouter from './routes/userAuthRoutes/auth.router.ts';

dotenv.config()

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: 'http://localhost:3000', 
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization', 
  credentials: true, 
};


app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);

// Start the server
app.listen(port, () => {
  dbConnect();
  console.log(`Server is running on http://localhost:${port}`.bgBlue.bold);
});
