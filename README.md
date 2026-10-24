# 7PAX Website

Next.js and Three.js travel website.

## Run on Kali Linux

Install Node.js and npm if they are not already available:

```bash
sudo apt update
sudo apt install -y nodejs npm
```

Check that Node.js is version 18.18 or newer:

```bash
node --version
npm --version
```

Start the development server from the app directory:

```bash
cd Website
npm ci
npm run dev
```

Open http://localhost:3000 in a browser.

For a production build:

```bash
cd Website
npm ci
npm run build
npm start
```