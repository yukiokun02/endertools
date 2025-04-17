# Minecraft Resource Pack Tools - EnderHOST

A web application for Minecraft resource pack management, featuring a Resource Pack Merger, Download Link Generator, and SHA-1 Hash Generator.

## Project Overview

This project provides Minecraft server administrators and players with tools to:

1. **Merge Resource Packs**: Combine multiple resource packs into a single pack.
2. **Generate Download Links**: Create shareable download links for resource packs.
3. **Generate SHA-1 Hashes**: Calculate SHA-1 hashes required for Minecraft resource packs.

## Backend Integration Guide

The frontend is built with React and is set up to communicate with a backend API. Here's how to implement the backend for each tool:

### API Endpoints

The frontend expects the following API endpoints:

1. **Resource Pack Merger**: `/api/merge`
   - Method: POST
   - Accepts: Two resource pack files (multipart/form-data)
   - Returns: A merged resource pack file (application/zip)

2. **Download Link Generator**: `/api/generate-link`
   - Method: POST
   - Accepts: Resource pack file (multipart/form-data)
   - Returns: JSON with a download link URL

3. **SHA-1 Hash Generator**: `/api/generate-sha1`
   - Method: POST
   - Accepts: Resource pack file (multipart/form-data)
   - Returns: JSON with the SHA-1 hash

### Implementation Steps

1. **Set up your backend server**:
   - Create a Node.js/Express server or use any other backend technology
   - Set up CORS to allow requests from your frontend

2. **Implement the Resource Pack Merger**:
   ```javascript
   // Example Express implementation
   const express = require('express');
   const multer = require('multer');
   const JSZip = require('jszip');
   const cors = require('cors');
   const fs = require('fs');

   const app = express();
   app.use(cors());
   
   const upload = multer({ dest: 'uploads/' });
   
   app.post('/api/merge', upload.fields([
     { name: 'file1', maxCount: 1 },
     { name: 'file2', maxCount: 1 }
   ]), async (req, res) => {
     try {
       // Get uploaded files
       const file1Path = req.files.file1[0].path;
       const file2Path = req.files.file2[0].path;
       
       // Read files
       const file1Data = fs.readFileSync(file1Path);
       const file2Data = fs.readFileSync(file2Path);
       
       // Load resource packs
       const zip1 = await JSZip.loadAsync(file1Data);
       const zip2 = await JSZip.loadAsync(file2Data);
       
       // Create new merged zip
       const mergedZip = new JSZip();
       
       // Add files from first pack
       for (const [path, file] of Object.entries(zip1.files)) {
         if (!file.dir) {
           const content = await file.async('nodebuffer');
           mergedZip.file(path, content);
         }
       }
       
       // Add files from second pack (overwriting duplicates)
       for (const [path, file] of Object.entries(zip2.files)) {
         if (!file.dir) {
           const content = await file.async('nodebuffer');
           mergedZip.file(path, content);
         }
       }
       
       // Generate merged zip
       const mergedContent = await mergedZip.generateAsync({
         type: 'nodebuffer',
         compression: 'DEFLATE'
       });
       
       // Send response
       res.setHeader('Content-Type', 'application/zip');
       res.setHeader('Content-Disposition', 'attachment; filename="merged_pack.zip"');
       res.send(mergedContent);
       
       // Clean up temporary files
       fs.unlinkSync(file1Path);
       fs.unlinkSync(file2Path);
     } catch (error) {
       console.error('Error merging packs:', error);
       res.status(500).json({ error: 'Failed to merge resource packs' });
     }
   });
   ```

3. **Implement the Download Link Generator**:
   ```javascript
   app.post('/api/generate-link', upload.single('file'), async (req, res) => {
     try {
       // Get uploaded file
       const filePath = req.file.path;
       
       // Generate a unique ID for the file
       const fileId = generateUniqueId();
       
       // Store the file in your storage system (local, S3, etc.)
       const downloadUrl = await storeFile(filePath, fileId);
       
       // Return the download link
       res.json({ downloadLink: downloadUrl });
       
       // Clean up temporary file
       fs.unlinkSync(filePath);
     } catch (error) {
       console.error('Error generating link:', error);
       res.status(500).json({ error: 'Failed to generate download link' });
     }
   });
   ```

4. **Implement the SHA-1 Hash Generator**:
   ```javascript
   const crypto = require('crypto');
   
   app.post('/api/generate-sha1', upload.single('file'), async (req, res) => {
     try {
       // Get uploaded file
       const filePath = req.file.path;
       
       // Read file
       const fileData = fs.readFileSync(filePath);
       
       // Calculate SHA-1 hash
       const hash = crypto.createHash('sha1');
       hash.update(fileData);
       const sha1Hash = hash.digest('hex');
       
       // Return the hash
       res.json({ sha1Hash });
       
       // Clean up temporary file
       fs.unlinkSync(filePath);
     } catch (error) {
       console.error('Error generating hash:', error);
       res.status(500).json({ error: 'Failed to generate SHA-1 hash' });
     }
   });
   ```

5. **Start the server**:
   ```javascript
   const PORT = process.env.PORT || 5000;
   app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
   });
   ```

### Required Backend Dependencies

For a Node.js implementation, you'll need:

- express: Web server framework
- multer: Handling file uploads
- jszip: Processing ZIP files
- cors: Handling cross-origin requests
- fs: File system operations
- crypto: For SHA-1 hash generation

Install these using npm:
```bash
npm install express multer jszip cors crypto
```

### Frontend Integration

The frontend code is already set up to communicate with these endpoints in the `src/utils/api.ts` file. Update the API endpoint URLs in this file to match your backend server:

```typescript
// src/utils/api.ts
export const mergeResourcePacks = async (file1: File, file2: File): Promise<Blob> => {
  // Update the URL to your backend endpoint
  const API_URL = 'https://your-backend-server.com/api/merge';
  
  const formData = new FormData();
  formData.append('file1', file1);
  formData.append('file2', file2);
  
  const response = await fetch(API_URL, {
    method: 'POST',
    body: formData,
  });
  
  // Rest of the code...
};
```

### Deployment Considerations

1. **CORS Configuration**: Ensure your backend server is configured to accept requests from your frontend domain.

2. **File Size Limits**: Configure appropriate file size limits for resource pack uploads.

3. **Storage**: For the download link generator, consider using a cloud storage service like AWS S3 for storing resource packs.

4. **Rate Limiting**: Implement rate limiting to prevent abuse of your API endpoints.

5. **Error Handling**: Ensure proper error handling on both the frontend and backend.

## Powered by EnderHOST

This project is maintained and provided by EnderHOST, a premium Minecraft server hosting solution. Visit [EnderHOST](https://enderhost.in) for more information.

## Project info

**URL**: https://lovable.dev/projects/2926da1b-b544-4d72-9b47-7e7ab27381df

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/2926da1b-b544-4d72-9b47-7e7ab27381df) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/2926da1b-b544-4d72-9b47-7e7ab27381df) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
