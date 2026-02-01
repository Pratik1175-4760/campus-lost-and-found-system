import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
import express from 'express';
import cors from 'cors';
import itemRoutes from './routes/item.routes.js';  // ✅ Add this

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// Test route
app.get('/', (req, res) => {
  res.json({ message: '🚀 Lost and Found API is running!' });
});

// ✅ Add item routes
app.use('/api/items', itemRoutes);

export { app };