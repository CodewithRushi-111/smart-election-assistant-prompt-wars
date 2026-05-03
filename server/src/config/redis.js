import { createClient } from 'redis';

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  socket: {
    reconnectStrategy: (retries) => {
      if (retries > 5) return new Error('Redis connection failed permanently');
      return Math.min(retries * 50, 500);
    }
  }
});

redisClient.on('error', (err) => {
  // Silent error after first failure to prevent log spam
  if (redisClient.isOpen) {
    console.log('Redis Error:', err.message);
  }
});

export const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log('Redis Client Connected');
  } catch (error) {
    console.log('Redis not available. Running without cache.');
  }
};

export default redisClient;
