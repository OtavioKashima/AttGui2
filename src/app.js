import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/index.js';
import errorHandler from './middleware/errorHandler.js';

// Carrega variáveis de ambiente
dotenv.config();

const app = express();

// Middlewares
app.use(cors()); // Habilita CORS para todas as origens
app.use(express.json()); // Middleware para parsear JSON

// Rota de "saúde"
app.get('/', (req, res) => {
  res.json({ message: 'API Semeando Futuros está no ar!' });
});

// Rotas principais da API
app.use('/api', apiRoutes);

// Middleware de tratamento de erros
app.use(errorHandler);

export default app;