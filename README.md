
# Minecraft Resource Pack Tools - EnderHOST

A web application for Minecraft resource pack management, featuring a Resource Pack Merger, Download Link Generator, and SHA-1 Hash Generator.

## Project Overview

This project provides Minecraft server administrators and players with tools to:

1. **Merge Resource Packs**: Combine multiple resource packs into a single pack.
2. **Generate Download Links**: Create shareable download links for resource packs.
3. **Generate SHA-1 Hashes**: Calculate SHA-1 hashes required for Minecraft resource packs.

## Deployment Guide

### Option 1: Frontend-Only Deployment (Quick Start)

This application currently includes browser-based implementations of all tools, so you can deploy it without a backend for testing and demonstration purposes:

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to the project directory
cd minecraft-tools

# Install dependencies
npm install

# Build for production
npm run build

# The build output will be in the 'dist' directory, which you can serve with any static file server
```

**Important Note**: The browser-based implementations have the following limitations:
- Resource Pack Merger: Works fully in the browser but doesn't persist merged packs
- Download Link Generator: Creates temporary URLs valid only during the session
- SHA-1 Hash Generator: Works fully in the browser

### Option 2: Full Backend Integration (Recommended for Production)

For a production environment, replace the browser-based implementations with proper backend API calls:

1. **Set up your backend server**:
   - Create a Node.js/Express server or use any other backend technology
   - Set up CORS to allow requests from your frontend

2. **Update API Endpoints**:
   Open `src/utils/api.ts` and replace the current implementations with API calls to your backend:

```typescript
// Example updated mergeResourcePacks function with backend API
export const mergeResourcePacks = async (file1: File, file2: File): Promise<Blob> => {
  const formData = new FormData();
  formData.append('file1', file1);
  formData.append('file2', file2);
  
  const response = await fetch('https://your-backend-url.com/api/merge', {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error('Failed to merge resource packs');
  }
  
  return await response.blob();
};
```

## Backend Implementation Guide

The frontend expects these API endpoints:

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

## VPS Deployment Instructions

To deploy this application on your VPS:

1. **Install Node.js and npm** (if not already installed):
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd minecraft-tools
   ```

3. **Install dependencies and build**:
   ```bash
   npm install
   npm run build
   ```

4. **Set up a web server**:
   
   Using Nginx (recommended):
   ```bash
   sudo apt install nginx
   
   # Create a new site configuration
   sudo nano /etc/nginx/sites-available/minecraft-tools
   ```

   Add this configuration:
   ```
   server {
       listen 80;
       server_name your-domain.com;
       
       root /path/to/your/project/dist;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
       
       # If you add a backend API, add a location for it:
       # location /api {
       #     proxy_pass http://localhost:5000;
       #     proxy_http_version 1.1;
       #     proxy_set_header Upgrade $http_upgrade;
       #     proxy_set_header Connection 'upgrade';
       #     proxy_set_header Host $host;
       #     proxy_cache_bypass $http_upgrade;
       # }
   }
   ```

   Enable the site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/minecraft-tools /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

5. **Set up SSL with Let's Encrypt** (recommended):
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

6. **If you implement a backend** (optional):
   - Create a Node.js/Express server
   - Set up a process manager like PM2:
     ```bash
     npm install -g pm2
     cd /path/to/your/backend
     pm2 start app.js --name minecraft-tools-api
     pm2 save
     pm2 startup
     ```

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
