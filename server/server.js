
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const JSZip = require('jszip');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
const publicDir = path.join(__dirname, 'public');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later'
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueFilename = `${Date.now()}-${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueFilename);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB file size limit
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/downloads', express.static(path.join(__dirname, 'public')));
app.use('/api', apiLimiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// API endpoint to merge resource packs
app.post('/api/merge', upload.array('resourcePacks', 2), async (req, res) => {
  try {
    if (!req.files || req.files.length !== 2) {
      return res.status(400).json({ error: 'Please upload exactly 2 resource pack files' });
    }

    const file1Path = req.files[0].path;
    const file2Path = req.files[1].path;

    // Read file data
    const file1Data = fs.readFileSync(file1Path);
    const file2Data = fs.readFileSync(file2Path);

    // Load the resource packs
    const zip1 = await JSZip.loadAsync(file1Data);
    const zip2 = await JSZip.loadAsync(file2Data);
    
    // Create new merged zip
    const mergedZip = new JSZip();
    
    // Add files from first pack
    for (const path in zip1.files) {
      if (!zip1.files[path].dir) {
        const content = await zip1.files[path].async('nodebuffer');
        mergedZip.file(path, content);
      } else {
        // Create directory structure
        mergedZip.folder(path);
      }
    }
    
    // Add files from second pack (overwriting duplicates)
    for (const path in zip2.files) {
      if (!zip2.files[path].dir) {
        const content = await zip2.files[path].async('nodebuffer');
        mergedZip.file(path, content);
      } else if (!mergedZip.files[path]) {
        // Create directory structure if it doesn't exist
        mergedZip.folder(path);
      }
    }
    
    // Generate merged zip
    const mergedContent = await mergedZip.generateAsync({
      type: 'nodebuffer',
      compression: 'DEFLATE',
      compressionOptions: {
        level: 9 // Best compression
      }
    });

    // Create a unique filename for the merged resource pack
    const mergedFileName = `merged_pack_${Date.now()}.zip`;
    const mergedFilePath = path.join(publicDir, mergedFileName);
    
    // Save merged file
    fs.writeFileSync(mergedFilePath, mergedContent);

    // Clean up temporary files
    fs.unlinkSync(file1Path);
    fs.unlinkSync(file2Path);

    // Return download URL
    const downloadUrl = `/downloads/${mergedFileName}`;
    res.json({ 
      success: true, 
      url: downloadUrl,
      message: 'Resource packs merged successfully' 
    });
  } catch (error) {
    console.error('Error merging resource packs:', error);
    res.status(500).json({ 
      error: 'Failed to merge resource packs',
      message: error.message
    });
  }
});

// API endpoint to generate download link
app.post('/api/generate-link', upload.single('resourcePack'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload a resource pack file' });
    }

    // Create a unique filename for the uploaded resource pack
    const fileName = `resource_pack_${Date.now()}${path.extname(req.file.originalname)}`;
    const filePath = path.join(publicDir, fileName);
    
    // Copy the file to public directory
    fs.copyFileSync(req.file.path, filePath);
    
    // Clean up temporary file
    fs.unlinkSync(req.file.path);

    // Return download URL
    const downloadUrl = `/downloads/${fileName}`;
    res.json({ 
      success: true, 
      url: downloadUrl,
      message: 'Download link generated successfully'
    });
  } catch (error) {
    console.error('Error generating download link:', error);
    res.status(500).json({ 
      error: 'Failed to generate download link',
      message: error.message
    });
  }
});

// API endpoint to generate SHA-1 hash
app.post('/api/generate-sha1', upload.single('resourcePack'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload a resource pack file' });
    }

    // Read file data
    const fileData = fs.readFileSync(req.file.path);
    
    // Calculate SHA-1 hash
    const hash = crypto.createHash('sha1');
    hash.update(fileData);
    const sha1Hash = hash.digest('hex');

    // Clean up temporary file
    fs.unlinkSync(req.file.path);

    res.json({ 
      success: true, 
      hash: sha1Hash,
      message: 'SHA-1 hash generated successfully'
    });
  } catch (error) {
    console.error('Error generating SHA-1 hash:', error);
    res.status(500).json({ 
      error: 'Failed to generate SHA-1 hash',
      message: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
