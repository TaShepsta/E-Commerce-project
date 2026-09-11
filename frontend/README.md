# Rentosphere

## Run locally

Install dependencies once:

```bash
npm install
cd backend
npm install
```

Create `backend/.env` with your MySQL details if they differ from the defaults:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=rentosphere
PORT=5000
```

Run the database script in `backend/sql/database.sql`, then use two terminals:

```bash
npm run backend
npm run dev
```

The frontend runs at `http://localhost:5173` and the backend at
`http://localhost:5000`. Check `http://localhost:5000/api/health` to confirm
that both the server and MySQL are available.
