// Factory function que retorna um middleware de validação
const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, {
    abortEarly: false, // Retorna todos os erros de validação, não apenas o primeiro
    allowUnknown: false // Rejeita campos desconhecidos
  });

  if (error) {
    // Adiciona uma flag para o errorHandler identificar
    error.isJoi = true; 
    return next(error);
  }

  next();
};

export default validate;