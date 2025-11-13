import db from '../config/db.js';

// GET /api/metrics
export const getAllMetrics = async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM impact_metrics');
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

// POST /api/metrics
export const createMetric = async (req, res, next) => {
  try {
    const { titulo, valor, icone_svg } = req.body;
    
    const [result] = await db.query(
      'INSERT INTO impact_metrics (titulo, valor, icone_svg) VALUES (?, ?, ?)',
      [titulo, valor, icone_svg]
    );

    res.status(201).json({ 
      id: result.insertId, 
      titulo, 
      valor 
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/metrics/:id
export const updateMetric = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { titulo, valor, icone_svg } = req.body;

    // 1. Busca a métrica atual
    const [currentRows] = await db.query('SELECT * FROM impact_metrics WHERE id = ?', [id]);
    if (currentRows.length === 0) {
      return res.status(404).json({ message: 'Métrica não encontrada' });
    }
    const currentMetric = currentRows[0];
    
    // 2. Mescla os dados
    const updatedMetric = {
      titulo: titulo !== undefined ? titulo : currentMetric.titulo,
      valor: valor !== undefined ? valor : currentMetric.valor,
      icone_svg: icone_svg !== undefined ? icone_svg : currentMetric.icone_svg,
    };

    const [result] = await db.query(
      'UPDATE impact_metrics SET titulo = ?, valor = ?, icone_svg = ? WHERE id = ?',
      [updatedMetric.titulo, updatedMetric.valor, updatedMetric.icone_svg, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Métrica não encontrada' });
    }

    res.json({ id: parseInt(id), ...updatedMetric });
  } catch (error) {
    next(error);
  }
};