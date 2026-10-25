import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));


app.use('/api/users', userRouter);

app.get('/', (req, res) => {
    res.json({message: 'Task Vault API fungerar som den ska!'});
});

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Ansluten till MongoDB!')

    app.listen(PORT, () => {
    console.log(`Servern körs på http://localhost:${PORT}`);
});
}).catch((err) => {
    console.error('kunde inte ansluta till MongoDB:', err)
});

