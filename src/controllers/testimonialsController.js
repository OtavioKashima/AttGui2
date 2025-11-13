import db from '../config/db.js';

// GET /api/testimonials/public
export const getPublicTestimonials = async (req, res, next) => {
  try {
    const [rows] = await db.query("SELECT * FROM testimonials WHERE status = 'aprovado'");
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

// GET /api/testimonials/admin
export const getAdminTestimonials = async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM testimonials');
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

// POST /api/testimonials
export const createTestimonial = async (req, res, next) => {
  try {
    const { autor, relacao, texto } = req.body;
    // O status padrão 'pendente' é definido no banco de dados
    
    const [result] = await db.query(
      'INSERT INTO testimonials (autor, relacao, texto) VALUES (?, ?, ?)',
      [autor, relacao, texto]
    );

    res.status(201).json({ 
      id: result.insertId, 
      autor,
      status: 'pendente' 
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/testimonials/:id/approve
export const approveTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const [result] = await db.query(
      "UPDATE testimonials SET status = 'aprovado' WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Depoimento não encontrado' });
    }

    res.json({ message: 'Depoimento aprovado com sucesso' });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/testimonials/:id
export const deleteTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [result] = await db.query('DELETE FROM testimonials WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Depoimento não encontrado' });
    }

    res.status(204).send(); // 204 No Content
  } catch (error) {
    next(error);
  }
};