import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth';
import todoRoutes from './routes/todo';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/todo', todoRoutes);


app.get("/{/*splat}", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, ()=>{
    console.log(`Server running on port : ${PORT}`)
});