
# Minecraft Resource Pack Tools - EnderHOST

A web application for Minecraft resource pack management, featuring a Resource Pack Merger, Download Link Generator, and SHA-1 Hash Generator.

## Features

1. **Resource Pack Merger**: Combine multiple Minecraft resource packs into a single pack.
2. **Download Link Generator**: Create shareable download links for resource packs.
3. **SHA-1 Hash Generator**: Calculate SHA-1 hashes required for Minecraft server configurations.

## Quick Start (5-Minute Setup)

This application is designed to run entirely in the browser with no backend required:

```bash
# 1. Clone the repository
git clone <your-repo-url>

# 2. Navigate to project directory
cd minecraft-tools

# 3. Install dependencies
npm install

# 4. Build for production
npm run build

# 5. Serve the dist folder with a web server
```

That's it! Your application is now ready to use.

## VPS Deployment Guide

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

### Step 2: Clone and Build the Application

```bash
# Clone the repository
git clone <your-repo-url>
cd minecraft-tools

# Install dependencies
npm install

# Build for production
npm run build
```

### Step 3: Set Up a Web Server

#### Option A: Using Nginx (Recommended for Production)

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
    
    root /path/to/minecraft-tools/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Optional: Add caching for static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
}
```

Enable the site and restart Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/minecraft-tools /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### Option B: Using a Simple HTTP Server for Testing

```bash
# Install a simple HTTP server globally
npm install -g serve

# Serve the application (from the project directory)
serve -s dist -p 8080
```

### Step 4: Set Up SSL (Recommended)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain and configure SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### Step 5: Keep the Server Running (Optional)

If you're using the simple HTTP server instead of Nginx, you might want to keep it running:

```bash
# Install PM2 process manager
npm install -g pm2

# Start the server with PM2
pm2 start "serve -s dist -p 8080" --name minecraft-tools

# Set PM2 to start on system boot
pm2 startup
pm2 save
```

## How It Works

This application uses browser-based implementations of all tools to eliminate the need for a backend:

- **Resource Pack Merger**: Uses JSZip for client-side ZIP file manipulation
- **Download Link Generator**: Creates temporary object URLs valid during the browser session
- **SHA-1 Hash Generator**: Calculates hashes directly in the browser using crypto-browserify

## Limitations of Client-Side Mode

The current implementation has some limitations:

1. **Download links are temporary**: They work only during the current browser session.
2. **No persistent storage**: Merged resource packs are not saved anywhere.
3. **Processing large files**: Extremely large resource packs may cause browser performance issues.

## Backend Integration (Optional)

If you need permanent links and better performance, you can integrate this with a Node.js backend:

1. Create a Node.js/Express server in a new directory (e.g., `server/`)
2. Implement the following API endpoints:
   - `/api/merge` - For merging resource packs
   - `/api/generate-link` - For creating permanent download links
   - `/api/generate-sha1` - For generating SHA-1 hashes
3. Update `src/utils/api.ts` to call these endpoints instead of using browser-based implementations
4. Build and deploy both the frontend and backend

## Troubleshooting

### Common Issues

- **"ReferenceError: global is not defined"**: This could happen in some browsers. The app includes polyfills to fix this, but if you encounter it, make sure you're using the latest browser version.
- **"Failed to load resource pack"**: Ensure your ZIP files are valid Minecraft resource packs.
- **Slow performance with large files**: Try using smaller resource packs or consider setting up the optional backend.

### Getting Help

If you need assistance, please file an issue on the GitHub repository or contact EnderHOST support.

## Powered by EnderHOST

This project is maintained and provided by EnderHOST, a premium Minecraft server hosting solution. Visit [EnderHOST](https://enderhost.in) for more information about our hosting services.
