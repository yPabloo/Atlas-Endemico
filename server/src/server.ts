import express from 'express';
import cors from 'cors'
import connectDB from './database';
import mapaInterativoRouter from './routes/mapaInterativo';
import registroCasoRouter from './routes/registroDeCaso'
import dotenv from 'dotenv'

dotenv.config()

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/mapa-interativo', mapaInterativoRouter);
app.use('/api/registro-caso', registroCasoRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});