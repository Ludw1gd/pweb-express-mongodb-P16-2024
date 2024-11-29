import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db-connection';
import authRoutes from './routes/auth.route';
import bookRoutes from './routes/book.route';
import mechanismRoutes from './routes/mechanism.route';
import cors from 'cors';
// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// konfigurasi cors
app.use(cors({
  origin: 'http://localhost:5173', //izinkan akses dari fron-end
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], //sesuaikan metode yang diizinkan
  credentials: true, //jika ada cookie atau session
}));

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/auth', authRoutes);
app.use(bookRoutes);
app.use('/mechanism', mechanismRoutes);

// Endpoint Health Check
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Hello World!',
    date: new Date().toUTCString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
