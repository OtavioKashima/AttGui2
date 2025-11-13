import Joi from 'joi';

// Esquema para CRIAR um membro da equipe
export const teamSchema = Joi.object({
  nome: Joi.string().min(3).max(100).required(),
  cargo: Joi.string().min(3).max(100).required(),
  url_foto: Joi.string().uri().allow(null, ''),
  bio_curta: Joi.string().allow(null, '')
});

// Esquema para ATUALIZAR (PUT/PATCH) um membro da equipe
// Campos são opcionais
export const updateTeamSchema = Joi.object({
  nome: Joi.string().min(3).max(100),
  cargo: Joi.string().min(3).max(100),
  url_foto: Joi.string().uri().allow(null, ''),
  bio_curta: Joi.string().allow(null, '')
});

// Esquema para CRIAR uma métrica
export const metricsSchema = Joi.object({
  titulo: Joi.string().min(3).max(100).required(),
  valor: Joi.string().min(1).max(50).required(),
  icone_svg: Joi.string().allow(null, '')
});

// Esquema para ATUALIZAR uma métrica
export const updateMetricsSchema = Joi.object({
  titulo: Joi.string().min(3).max(100),
  valor: Joi.string().min(1).max(50),
  icone_svg: Joi.string().allow(null, '')
});

// Esquema para CRIAR um depoimento
export const testimonialSchema = Joi.object({
  autor: Joi.string().min(3).max(100).required(),
  relacao: Joi.string().max(100).allow(null, ''),
  texto: Joi.string().min(10).required()
  // Status não é validado aqui pois é definido no backend/db
});