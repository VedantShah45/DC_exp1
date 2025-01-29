// Import required modules
import express from 'express';
import cors from 'cors'; // Import cors
const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: 'http://your-frontend-domain.com', 
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
  const { name, age } = req.body;
  res.json({ message: `Hello, ${name}. You are ${age} years old.` });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
