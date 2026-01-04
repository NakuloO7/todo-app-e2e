
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/auth', authRoutes);


app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, ()=>{
    console.log(`Server running on port : ${PORT}`)
})