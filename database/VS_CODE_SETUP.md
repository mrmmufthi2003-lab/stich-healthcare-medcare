# Medcare Hospital Web Application - VS Code & Database Setup Guide
## (தமிழ் & English Setup Instructions)

---

### 1. VS Code-இல் Run செய்வது எப்படி? (How to run in VS Code)

#### Step 1: Clone or Open Project in VS Code
1. Open **Visual Studio Code**.
2. Go to **File > Open Folder...** and select this project folder.
3. Open the built-in terminal in VS Code (`Ctrl + ~` or **Terminal > New Terminal**).

#### Step 2: Dependencies Install செய்தல்
Terminal-இல் கீழ்க்கண்ட command-ஐ run செய்யவும்:
```bash
npm install
```

#### Step 3: Application Run செய்தல் (Frontend + Backend)
இந்த project-இல் React Frontend மற்றும் Express Backend இரண்டும் ஒரே command-இல் run ஆகும்:
```bash
npm run dev
```
Terminal-இல் இது போன்ற செய்தி வரும்:
```
Medcare Server running on http://0.0.0.0:3000
```
இப்போது உங்கள் browser-இல் **`http://localhost:3000`**-ஐ திறந்து பார்த்தால் Medcare Portal இயங்கும்!

---

### 2. Database Connection (Database எப்படி வேலை செய்கிறது?)

இந்த application-இல் default-ஆகவே **Persistent JSON Database** (`data/medcare_database.json`) கட்டமைக்கப்பட்டுள்ளது.
- நீங்கள் book செய்யும் appointments, patient inquiries, branches அனைத்தும் தானாகவே disk-இல் சேமிக்கப்படும்.
- Server restart ஆனாலும் உங்கள் data அழியாது.

#### PostgreSQL அல்லது Supabase / Neon Connect செய்ய:
1. `.env` file-இல் உங்கள் database URL-ஐ சேர்க்கவும்:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/medcare_db"
   ```
2. `database/schema.sql` file-இல் உள்ள SQL tables-ஐ உங்கள் PostgreSQL database-இல் execute செய்யவும்.
3. `server/db.ts` file-இல் `pg` அல்லது `prisma` / `drizzle` client மூலம் query செய்து கொள்ளலாம்.

#### SQLite Connect செய்ய:
1. `npm install better-sqlite3` அல்லது `sqlite3`.
2. `database/schema.sql`-ஐ SQLite DB-இல் load செய்யவும்.

---

### 3. API Endpoints (Backend REST APIs)

Backend-இல் உள்ள முக்கியமான endpoints:
- `GET /api/branches` - அனைத்து மருத்துவமனை & கிளினிக் கிளைகள் (filters: category, search)
- `GET /api/doctors` - மருத்துவர்கள் பட்டியல் (filters: specialty, branchId, search)
- `GET /api/specialties` - சிகிச்சைப் பிரிவுகள் (Cardiology, Orthopaedics, etc.)
- `GET /api/packages` - Health screening packages
- `GET /api/appointments` - Book செய்யப்பட்ட appointments
- `POST /api/appointments` - புதிய appointment பதிவு செய்தல்
- `DELETE /api/appointments/:id` - Appointment cancel செய்தல்
- `POST /api/inquiries` - Patient callback inquiry
- `GET /api/db-status` - Database நிலை மற்றும் record counts

---

### 4. Project Structure (கோப்பு கட்டமைப்பு)
```
├── server.ts                 # Express Full-Stack Server & Vite integration
├── server/
│   ├── data.ts               # Initial Seed Data (Branches, Doctors, Packages)
│   └── db.ts                 # Database persistence engine (Reads/Writes to data/)
├── data/
│   └── medcare_database.json # Active Persistent Database file
├── database/
│   └── schema.sql            # PostgreSQL, MySQL & SQLite SQL Tables
├── src/
│   ├── components/           # React Components (Hero, Branches, Booking, Doctors, etc.)
│   ├── types.ts              # TypeScript Data Interfaces
│   ├── App.tsx               # Main Healthcare Application UI
│   ├── main.tsx              # React DOM Entrypoint
│   └── index.css             # Tailwind CSS & Typography
└── package.json              # Node.js Scripts & Dependencies
```
