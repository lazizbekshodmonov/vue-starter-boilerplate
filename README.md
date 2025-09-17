# Vue 3 + TypeScript + Vite Starter Boilerplate

This is a starter boilerplate for building Vue 3 applications with **TypeScript** and **Vite**.  
It comes with a minimal setup to get you started quickly.

## Features
- ⚡️ Vite for fast development and building
- 🖖 Vue 3 with `<script setup>` syntax
- 🟦 TypeScript support out of the box
- 🎨 Ready to extend with UI libraries (Ant Design Vue, TailwindCSS, etc.)
- 📂 Clean folder structure for scalability

---

### env example

```dotenv
VITE_API_BASE_URL=
VITE_API_VERSION_URL=
```

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/lazizbekshodmonov/vue-starter-boilerplate.git
cd vue-starter-boilerplate

```

### 2. Install dependencies
```bash
# Install with pnpm
pnpm install

# Install with npm
npm install

# Install with yarn
yarn install
```

### 3. Run in development mode
```bash
# Install with pnpm
pnpm dev

# Install with npm
npm run dev

# Install with yarn
yarn dev
```

### 3. Build for Production
#### With package managers

```bash
# Install with pnpm
pnpm build

# Install with npm
npm run build

# Install with yarn
yarn build
```

#### With Docker
###### 1. Build and start the containers

```bash
docker-compose up -d --build
```
###### 2. Check running containers

```bash
docker ps
```
###### 3. View logs

```bash
docker-compose logs -f
```

###### 4. Stop the containers

```bash
docker-compose down
```

## ⚙️ Nginx Configuration (Frontend)

This project includes a **nginx configuration** for serving the frontend build and proxying API requests.

### nginx.conf example

```nginx
user  nginx;
worker_processes  1;

events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    resolver 127.0.0.11 valid=30s ipv6=off;

    sendfile        on;
    keepalive_timeout  65;

    include /etc/nginx/conf.d/*.conf;
}
```

### default.conf example
```nginx
server {
    listen 80;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://backend:8080;

        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 🔑 Key Points
#### Static frontend files are served from:

```nginx
/usr/share/nginx/html
```
#### SPA routing is handled by:

```nginx
try_files $uri $uri/ /index.html;
```
This ensures Vue Router works correctly in history mode.
#### API requests (/api/) are proxied to:

```nginx
http://backend:8080
```

### 🛠️ Updating Nginx Config

#### 1. Edit nginx.conf inside your project (or mounted volume).
#### 2. Rebuild and restart containers:

```bash
docker-compose up -d --build
```

