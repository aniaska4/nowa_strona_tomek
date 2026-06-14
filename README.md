# Strona wizytówka pianisty

Strona internetowa pianisty z panelem administracyjnym do zarządzania treścią. Projekt składa się z frontendu opartego na Vue 3 oraz backendu w Node.js + Express z bazą danych SQLite.

## Stos technologiczny

**Frontend:** Vue 3, Vite 5, Vue Router 4, Pinia, Tailwind CSS 3, Axios

**Backend:** Node.js, Express 5, SQLite3, JWT, Multer, bcryptjs, Sharp

---

## Wymagania

- Node.js v18+
- npm

---

## Instalacja

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

---

## Uruchomienie

Oba serwery muszą działać jednocześnie (w osobnych terminalach).

### Terminal 1 — Backend

```bash
cd backend
node src/app.js
```

Serwer API dostępny pod adresem: `http://localhost:3000`

### Terminal 2 — Frontend

```bash
cd frontend
npm run dev
```

Aplikacja dostępna pod adresem: `http://localhost:5173`

### Tryb deweloperski backendu (z auto-restartem)

```bash
cd backend
npm run dev
```

---

## Build produkcyjny (Frontend)

```bash
cd frontend
npm run build
```

Pliki wyjściowe znajdą się w katalogu `frontend/dist/`.

```bash
# Podgląd buildu produkcyjnego
cd frontend
npm run preview
```

---

## Panel administracyjny

- Adres: `http://localhost:5173/admin/login`
- Login: `admin`
- Hasło: `admin123`

---

## Baza danych

Plik bazy SQLite tworzony jest automatycznie przy pierwszym uruchomieniu backendu:

```
backend/database/pianist.db
```

---

## Struktura projektu

```
nowa_strona_tomek/
├── backend/
│   ├── src/
│   │   └── app.js          # Punkt wejścia serwera
│   ├── database/
│   │   └── pianist.db      # Baza danych SQLite (auto-generowana)
│   └── package.json
└── frontend/
    ├── src/
    ├── public/
    └── package.json
```
