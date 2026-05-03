import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';
import { errorHandler } from './middleware/errorMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Route imports
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import electionRoutes from './routes/election.routes.js';
import chatRoutes from './routes/chat.routes.js';
import candidateRoutes from './routes/candidate.routes.js';

const app = express();

// Security Middleware
app.use(helmet());
app.use(cors({ 
  origin: [process.env.CLIENT_URL, 'http://localhost:5173'].filter(Boolean),
  credentials: true 
}));

// Logging & Performance
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(compression());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api', limiter);

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get('/', (req, res) => {
  res.send('Smart Election Assistant API is running...');
});

// Mount Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/elections', electionRoutes);
app.use('/api/v1/chat', chatRoutes);
app.use('/api/v1/candidates', candidateRoutes);

// Static files for frontend
const buildPath = path.join(__dirname, '../../client/dist');
app.use(express.static(buildPath));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(buildPath, 'index.html'));
  }
});

// Error Handling Middleware
app.use(errorHandler);

export default app;
