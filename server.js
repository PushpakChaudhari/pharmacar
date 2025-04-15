import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js'; // Ensure the correct path and file extension

const app = express();
const PORT = 8080;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/auth', authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
