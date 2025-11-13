// Middleware genérico de tratamento de erros
// Deve ser o último middleware a ser adicionado no app.js
const errorHandler = (err, req, res, next) => {
  console.error('ERRO:', err.stack);

  // Se o erro for do Joi (validação)
  if (err.isJoi) {
    return res.status(400).json({
      message: 'Erro de validação',
      details: err.details.map(d => d.message)
    });
  }
  
  // Outros erros (ex: erro de SQL)
  // Em produção, não vaze detalhes do erro
  res.status(500).json({ 
    message: 'Erro interno do servidor',
    // Em desenvolvimento, você pode enviar o erro:
    // error: err.message 
  });
};

export default errorHandler;