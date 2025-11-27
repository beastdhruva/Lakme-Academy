
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use('/uploads', express.static('uploads'));

// Create uploads directory if it doesn't exist
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'lakme_academy',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Initialize database table
async function initializeDatabase() {
  try {
    const connection = await pool.getConnection();
    
    // Create database if not exists
    await connection.query(`CREATE DATABASE IF NOT EXISTS lakme_academy`);
    await connection.query(`USE lakme_academy`);
    
    // Create slides table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS slides (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        video_url TEXT,
        video_file TEXT,
        image_url TEXT,
        description TEXT,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('Database initialized successfully');
    connection.release();
  } catch (error) {
    console.error('Database initialization error:', error);
  }
}

initializeDatabase();

// Get all slides
app.get('/api/slides', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM slides ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching slides:', error);
    res.status(500).json({ message: 'Error fetching slides' });
  }
});

// Get active slides only (for frontend)
app.get('/api/slides/active', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM slides WHERE is_active = true ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching active slides:', error);
    res.status(500).json({ message: 'Error fetching active slides' });
  }
});

// Get single slide
app.get('/api/slides/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM slides WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Slide not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching slide:', error);
    res.status(500).json({ message: 'Error fetching slide' });
  }
});

// Create new slide
app.post('/api/slides', upload.fields([
  { name: 'video', maxCount: 1 },
  { name: 'image', maxCount: 1 }
]), async (req, res) => {
  try {
    const slideData = {
      title: req.body.title,
      video_url: req.body.video_url || '',
      video_file: req.files?.video ? `/uploads/${req.files.video[0].filename}` : '',
      image_url: req.files?.image ? `/uploads/${req.files.image[0].filename}` : req.body.image_url || '',
      description: req.body.description,
      is_active: req.body.is_active === 'true'
    };
    
    const [result] = await pool.query(
      'INSERT INTO slides (title, video_url, video_file, image_url, description, is_active) VALUES (?, ?, ?, ?, ?, ?)',
      [slideData.title, slideData.video_url, slideData.video_file, slideData.image_url, slideData.description, slideData.is_active]
    );
    
    const [newSlide] = await pool.query('SELECT * FROM slides WHERE id = ?', [result.insertId]);
    res.status(201).json(newSlide[0]);
  } catch (error) {
    console.error('Error creating slide:', error);
    res.status(500).json({ message: 'Error creating slide' });
  }
});

// Update slide
app.put('/api/slides/:id', upload.fields([
  { name: 'video', maxCount: 1 },
  { name: 'image', maxCount: 1 }
]), async (req, res) => {
  try {
    const [existing] = await pool.query('SELECT * FROM slides WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Slide not found' });
    }
    
    const slideData = {
      title: req.body.title,
      video_url: req.body.video_url || existing[0].video_url,
      video_file: req.files?.video ? `/uploads/${req.files.video[0].filename}` : existing[0].video_file,
      image_url: req.files?.image ? `/uploads/${req.files.image[0].filename}` : (req.body.image_url || existing[0].image_url),
      description: req.body.description,
      is_active: req.body.is_active === 'true'
    };
    
    await pool.query(
      'UPDATE slides SET title = ?, video_url = ?, video_file = ?, image_url = ?, description = ?, is_active = ? WHERE id = ?',
      [slideData.title, slideData.video_url, slideData.video_file, slideData.image_url, slideData.description, slideData.is_active, req.params.id]
    );
    
    const [updated] = await pool.query('SELECT * FROM slides WHERE id = ?', [req.params.id]);
    res.json(updated[0]);
  } catch (error) {
    console.error('Error updating slide:', error);
    res.status(500).json({ message: 'Error updating slide' });
  }
});

// Toggle slide status
app.patch('/api/slides/:id/toggle', async (req, res) => {
  try {
    const [existing] = await pool.query('SELECT * FROM slides WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Slide not found' });
    }
    
    await pool.query('UPDATE slides SET is_active = NOT is_active WHERE id = ?', [req.params.id]);
    const [updated] = await pool.query('SELECT * FROM slides WHERE id = ?', [req.params.id]);
    res.json(updated[0]);
  } catch (error) {
    console.error('Error toggling slide:', error);
    res.status(500).json({ message: 'Error toggling slide' });
  }
});

// Delete slide
app.delete('/api/slides/:id', async (req, res) => {
  try {
    const [existing] = await pool.query('SELECT * FROM slides WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Slide not found' });
    }
    
    await pool.query('DELETE FROM slides WHERE id = ?', [req.params.id]);
    res.json({ message: 'Slide deleted successfully' });
  } catch (error) {
    console.error('Error deleting slide:', error);
    res.status(500).json({ message: 'Error deleting slide' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend API running on http://0.0.0.0:${PORT}`);
});
