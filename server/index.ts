// Import required modules
import express from 'express';
import cors from 'cors'; 
import dotenv from "dotenv"

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

// Sample route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Example of a POST route
app.post('/data', (req, res) => {
  const { email } = req.body;
  res.json({ message: `Hello, ${email}.` });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
