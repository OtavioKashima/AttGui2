import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Cria um "pool" de conexões. O pool gerencia múltiplas conexões
// e as reutiliza, o que é muito mais eficiente do que criar
// uma nova conexão para cada consulta.
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  // password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'semeando_futuros_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Testa a conexão
pool.getConnection()
  .then(connection => {
    console.log('Conexão com o MySQL estabelecida com sucesso!');
    connection.release(); // Libera a conexão de volta para o pool
  })
  .catch(err => {
    console.error('Erro ao conectar com o MySQL:', err.message);
  });

export default pool;