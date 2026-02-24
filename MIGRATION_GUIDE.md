# Portfolio v2.0 — MERN Migration Complete ✅

The portfolio has been successfully migrated from a flat Vite app to a full-stack MERN monorepo.

---

## New Structure

```
my portfolio/
├── server/                    ← Express + MongoDB + Cloudinary backend
│   ├── package.json
│   ├── .env                   ← Configure before running!
│   ├── server.js
│   ├── migrateSeed.js         ← One-time seed script (see below)
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── controllers/
│
└── client/                    ← React + Vite + Tailwind frontend
    ├── package.json
    ├── tailwind.config.js     ← Burgundy theme configured
    ├── postcss.config.js
    ├── vite.config.js         ← Proxies /api → http://localhost:5001
    ├── index.html
    └── src/
        ├── theme.js           ← Single source of truth for colors & font
        ├── context/           ← AuthContext for JWT auth
        ├── hooks/             ← useProjects, useProject
        ├── components/        ← Header, Footer, PortfolioCard, ImageCollage
        ├── pages/             ← HomePage, ProjectDetailPage, Admin pages
        └── Data/              ← Old project images (for seed script)
```

---

## Quick Start

### 1. Configure Environment Variables

Edit **`server/.env`** with real values:

```env
PORT=5001
MONGO_URI=mongodb://localhost:27017/portfolio  # or MongoDB Atlas URI
JWT_SECRET=your-very-secret-random-string-here
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your-secure-password
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 2. Seed the Database

**Important:** The seed script uploads all 34 project images to Cloudinary and creates 4 project documents in MongoDB. Run this **once** after configuring `.env`:

```bash
cd server
node migrateSeed.js
```

After successful seeding, **delete** `migrateSeed.js` and `client/src/Data/` to clean up:

```bash
rm migrateSeed.js
rm -rf ../client/src/Data
```

### 3. Run the Server

```bash
cd server
npm run dev
```

Server runs on **http://localhost:5001**

### 4. Run the Client

In a separate terminal:

```bash
cd client
npm run dev
```

Client runs on **http://localhost:5173** (Vite default)

---

## Key Features Implemented

### Backend (Express + MongoDB)
- ✅ Project CRUD with Mongoose
- ✅ JWT authentication for admin routes
- ✅ Cloudinary image uploads via multer
- ✅ Public API: `GET /api/projects`, `GET /api/projects/:id`
- ✅ Admin API: `POST /api/admin/login`, `POST/PUT/DELETE /api/admin/projects`

### Frontend (React + Tailwind)
- ✅ Full Tailwind CSS migration (burgundy palette)
- ✅ Fixed nav scroll: "About" and "Portfolio" buttons scroll smoothly
- ✅ Per-project routes: `/portfolio/:id` (fully bookmarkable)
- ✅ Data fetching hooks: `useProjects()`, `useProject(id)`
- ✅ Admin dashboard with login, add/edit/delete projects
- ✅ Mobile-responsive (hamburger menu, stacked layouts)

### Fixes from v1
- ✅ **Nav scroll bug fixed:** Header now uses `getElementById` + `scrollIntoView` instead of broken refs
- ✅ **Bookmarkable project pages:** Cards link to `/portfolio/:id` instead of `location.state`
- ✅ **Card hover with Tailwind:** Uses `group` + `group-hover` pattern

---

## API Endpoints

### Public
```
GET  /api/projects          → Array of all projects (sorted by createdAt desc)
GET  /api/projects/:id      → Single project or 404
```

### Admin (all require `Authorization: Bearer <JWT>` header)
```
POST   /api/admin/login              → { email, password } → { token }
POST   /api/admin/projects           → Multipart form (text + images) → Created project
PUT    /api/admin/projects/:id       → Multipart form (files optional) → Updated project
DELETE /api/admin/projects/:id       → Deleted project
```

---

## Admin Access

1. Navigate to **http://localhost:5173/admin/login**
2. Use credentials from `server/.env` (`ADMIN_EMAIL` and `ADMIN_PASSWORD`)
3. After login, you can add/edit/delete projects at `/admin/dashboard`

---

## Production Build

To build the client for production:

```bash
cd client
npm run build
```

Output: `client/dist/`

You can serve the static files from Express by adding to `server/server.js`:

```js
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// After mounting routes, before app.listen():
app.use(express.static(path.resolve(__dirname, '../client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
});
```

Then run only the server (`node server.js`) and access the app at **http://localhost:5001**.

---

## Troubleshooting

### "Cannot find module" errors
Make sure you ran `npm install` in **both** `server/` and `client/` directories.

### Server won't connect to MongoDB
- Verify `MONGO_URI` in `server/.env`
- If using local MongoDB, ensure it's running: `mongod`
- If using MongoDB Atlas, check network access and connection string

### Images not uploading
- Verify Cloudinary credentials in `server/.env`
- Check Cloudinary dashboard for upload errors

### Seed script fails
- Ensure all images exist in `client/src/Data/` subfolders
- Verify file paths in `migrateSeed.js` match actual file names

---

## Migration Checklist

- [x] Monorepo structure created
- [x] Server bootstrapped with MongoDB + Cloudinary
- [x] Tailwind configured with burgundy theme
- [x] All components converted to Tailwind
- [x] Data fetching hooks created
- [x] Admin pages built
- [x] Old v1 files deleted
- [x] Dependencies installed
- [ ] **Configure `.env` with real credentials**
- [ ] **Run seed script once**
- [ ] **Test all endpoints**
- [ ] **Verify responsive design**

---

## What Changed from v1

| Aspect | v1 (Flat Vite) | v2 (MERN Monorepo) |
|--------|----------------|---------------------|
| **Structure** | Single root directory | `server/` + `client/` |
| **Data** | Static imports from `Data/PortfolioData.js` | MongoDB database |
| **Styling** | CSS Modules + `color.css` + `font.css` | Tailwind CSS only |
| **Images** | Local files in `src/Data/` | Cloudinary URLs |
| **Project Routes** | `/portfolio` with `location.state` | `/portfolio/:id` (bookmarkable) |
| **Nav Scroll** | Broken (used undefined refs) | Fixed (uses `getElementById`) |
| **Admin** | None | Full CRUD dashboard |
| **Auth** | None | JWT-based login |

---

**You're all set!** 🚀 Configure `.env`, run the seed script, and start both servers.
