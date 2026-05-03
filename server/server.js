import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import { connectRedis } from './src/config/redis.js';
import app from './src/app.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Connect to Redis
connectRedis();

// Health check for Render
app.get('/health', (req, res) => res.status(200).send('OK'));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
