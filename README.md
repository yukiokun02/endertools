
# Minecraft Resource Pack Tools - EnderHOST

A web application for Minecraft resource pack management, featuring a Resource Pack Merger, Download Link Generator, and SHA-1 Hash Generator.

## Features

1. **Resource Pack Merger**: Combine multiple Minecraft resource packs into a single pack.
2. **Download Link Generator**: Create shareable permanent download links for resource packs.
3. **SHA-1 Hash Generator**: Calculate SHA-1 hashes required for Minecraft server configurations.

## Architecture

This application uses a modern architecture with:
- React frontend with Tailwind CSS for a responsive UI
- Node.js/Express backend for handling resource packs processing
- File storage for permanent download links

## Quick Start (5-Minute Setup)

### Prerequisites
- Node.js (v16+) and npm installed
- Git installed

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone <your-repo-url>
cd minecraft-tools
```

### Step 2: Setup Backend

```bash
# Navigate to the server directory
cd server

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Start the server in development mode
npm run dev
```

The backend will run on `http://localhost:3000` by default.

### Step 3: Setup Frontend

```bash
# Navigate back to the project root
cd ..

# Install frontend dependencies
npm install

# Start the frontend development server
npm run dev
```

The frontend will run on `http://localhost:8080` by default.

You now have both the frontend and backend running in development mode!

## Production Deployment Guide

### Step 1: Prepare Your VPS

Make sure you have Node.js (v16+) and npm installed:

```bash
# Update package lists
sudo apt update

# Install Node.js and npm
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node -v
npm -v
```

### Step 2: Deploy the Backend

```bash
# Clone the repository
git clone <your-repo-url>
cd minecraft-tools

# Setup and build the backend
cd server
npm install
cp .env.example .env

# Edit the .env file to set your production values
nano .env
```

Configure the .env file for production:
```
PORT=3000
MAX_FILE_SIZE=50MB
CORS_ORIGIN=https://yourdomain.com
```

### Step 3: Setup PM2 for Backend Process Management

```bash
# Install PM2 globally
npm install -g pm2

# Start the backend with PM2
pm2 start server.js --name minecraft-tools-backend

# Make PM2 start on system boot
pm2 startup
pm2 save
```

### Step 4: Build the Frontend

```bash
# Navigate back to the project root
cd ..

# Install frontend dependencies
npm install

# Build for production
npm run build
```

### Step 5: Set Up Nginx as a Web Server and Reverse Proxy

```bash
# Install Nginx
sudo apt install nginx

# Create a site configuration
sudo nano /etc/nginx/sites-available/minecraft-tools
```

Add this configuration (replace `yourdomain.com` with your actual domain):

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    # Frontend static files
    location / {
        root /path/to/minecraft-tools/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
        
        # Optional: Add caching for static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 30d;
            add_header Cache-Control "public, no-transform";
        }
    }
    
    # Backend API proxy
    location /api {
        proxy_pass http://localhost:3000/api;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    
    # Download files proxy
    location /downloads {
        proxy_pass http://localhost:3000/downloads;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Enable the site and restart Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/minecraft-tools /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 6: Set Up SSL (Recommended)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain and configure SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### Step 7: Configure System Permissions

Ensure the application has proper permissions to write files:

```bash
# Set the correct ownership for the uploads and public directories
sudo chown -R $USER:$USER /path/to/minecraft-tools/server/uploads
sudo chown -R $USER:$USER /path/to/minecraft-tools/server/public

# Set proper permissions
sudo chmod -R 755 /path/to/minecraft-tools/server/uploads
sudo chmod -R 755 /path/to/minecraft-tools/server/public
```

## How It Works

The application architecture consists of two main parts:

### Frontend
- React-based UI for user interactions
- Makes API calls to the backend for resource pack operations
- Handles file uploads and displays results

### Backend
- Express.js server handling API requests
- Processes resource packs server-side for better performance
- Stores files for permanent download links
- Generates SHA-1 hashes server-side

## API Endpoints

The backend provides these API endpoints:

- **POST /api/merge** - Merges two resource packs
  - Requires two files uploaded as `resourcePacks`
  - Returns a URL to download the merged file

- **POST /api/generate-link** - Creates a permanent download link
  - Requires one file uploaded as `resourcePack`
  - Returns a permanent URL to the file

- **POST /api/generate-sha1** - Generates a SHA-1 hash
  - Requires one file uploaded as `resourcePack`
  - Returns the SHA-1 hash string

## Troubleshooting

### Common Issues

- **"Connection refused to API server"**: Ensure the backend server is running and accessible.
- **"Permission denied" errors**: Check file permissions on the server directories.
- **File upload errors**: Verify that the upload directories exist and are writable.
- **"File too large" errors**: Adjust the `MAX_FILE_SIZE` in the server's .env file.

### Backend Logs

To check backend logs when using PM2:

```bash
pm2 logs minecraft-tools-backend
```

### Getting Help

If you need assistance, please file an issue on the GitHub repository or contact EnderHOST support.

## Powered by EnderHOST

This project is maintained and provided by EnderHOST, a premium Minecraft server hosting solution. Visit [EnderHOST](https://enderhost.in) for more information about our hosting services.
