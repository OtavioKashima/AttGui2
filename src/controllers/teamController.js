import db from '../config/db.js';

// GET /api/team
export const getAllTeamMembers = async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM team_members');
    res.json(rows);
  } catch (error) {
    next(error); // Passa o erro para o errorHandler
  }
};

// GET /api/team/:id
export const getTeamMemberById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query('SELECT * FROM team_members WHERE id = ?', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Membro da equipe não encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
};

// POST /api/team
export const createTeamMember = async (req, res, next) => {
  try {
    const { nome, cargo, url_foto, bio_curta } = req.body;
    
    const [result] = await db.query(
      'INSERT INTO team_members (nome, cargo, url_foto, bio_curta) VALUES (?, ?, ?, ?)',
      [nome, cargo, url_foto, bio_curta]
    );

    res.status(201).json({ 
      id: result.insertId, 
      nome, 
      cargo 
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/team/:id
export const updateTeamMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nome, cargo, url_foto, bio_curta } = req.body;

    // Constrói a query dinamicamente apenas com campos fornecidos
    // (Esta é uma abordagem simples, para PUT completo seria mais direto)
    // Para um PUT, geralmente esperamos todos os campos.
    // Se for PATCH, apenas os campos que mudaram. Vamos assumir PUT (substituição total)
    // mas com flexibilidade (o Joi schema 'update' permite campos opcionais).

    // 1. Busca o membro atual
    const [currentRows] = await db.query('SELECT * FROM team_members WHERE id = ?', [id]);
    if (currentRows.length === 0) {
      return res.status(404).json({ message: 'Membro da equipe não encontrado' });
    }
    const currentMember = currentRows[0];

    // 2. Mescla os dados (ou substitui)
    const updatedMember = {
      nome: nome !== undefined ? nome : currentMember.nome,
      cargo: cargo !== undefined ? cargo : currentMember.cargo,
      url_foto: url_foto !== undefined ? url_foto : currentMember.url_foto,
      bio_curta: bio_curta !== undefined ? bio_curta : currentMember.bio_curta,
    };

    const [result] = await db.query(
      'UPDATE team_members SET nome = ?, cargo = ?, url_foto = ?, bio_curta = ? WHERE id = ?',
      [updatedMember.nome, updatedMember.cargo, updatedMember.url_foto, updatedMember.bio_curta, id]
    );

    if (result.affectedRows === 0) {
      // Isso não deveria acontecer se a verificação 404 acima funcionar, mas é uma boa prática
      return res.status(404).json({ message: 'Membro da equipe não encontrado' });
    }

    res.json({ id: parseInt(id), ...updatedMember });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/team/:id
export const deleteTeamMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [result] = await db.query('DELETE FROM team_members WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Membro da equipe não encontrado' });
    }

    res.status(204).send(); // 204 No Content
  } catch (error) {
    next(error);
  }
};