import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import userRoutes from "./routes/userRoutes.js";
import fareRoutes from "./routes/fareRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use( '/api/users', userRoutes);
app.use('/api/fares', fareRoutes);

app.get('/', (req, res) => {
  res.json({ 
    message: 'Kumasi Transport Fare API is running'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});