const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());


// Multer-Konfiguration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${timestamp}${ext}`);
  },
});

const upload = multer({ storage });

// Endpoint für Datei-Upload
app.post('/upload', upload.array('files'), (req, res) => {
  console.log('Dateien empfangen:', req.files);
  console.log('Anfrage erhalten:', req.files);
  res.json({ status: 'OK', files: req.files.map(f => f.filename) });
});

// Server starten
app.listen(port, () => {
  console.log(`✅ Server läuft auf http://localhost:${port}`);
});
