# Library Manager App

# [Emma Gustafsson]

## Beskrivning

Detta är en fullstack CRUD-applikation byggd med FastAPI (backend) och React (frontend).
Applikationen låter användaren skapa, läsa, uppdatera och ta bort böcker.

Data lagras i en SQLite-databas.

---

## Funktioner

* Visa alla böcker
* Lägg till ny bok
* Uppdatera befintlig bok
* Ta bort bok
* Data sparas i databas

---

## Teknologier

### Backend

* FastAPI
* SQLAlchemy
* SQLite
* Pydantic

### Frontend

* React
* Vite
* Fetch API

---

## Starta backend

```bash
cd backend
pip install -r requirements.txt
python app.py
```

---

## Starta frontend

```bash
cd frontend
npm install
npm run dev
```

---

## API Endpoints

* POST /books – Skapa ny bok
* GET /books – Hämta alla böcker
* GET /books/{id} – Hämta en bok
* PUT /books/{id} – Uppdatera bok
* DELETE /books/{id} – Ta bort bok

---

## Hur man använder appen

1. Starta backend och frontend
2. Öppna webbläsaren på http://localhost:5173
3. Lägg till böcker via formuläret
4. Redigera eller ta bort böcker
