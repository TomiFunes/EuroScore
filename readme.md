# ⚽ EuroScore

A football badge guessing game built with Node.js, Express, PostgreSQL and EJS. Club data and badges are fetched from TheSportsDB API.

## Live Demo 

https://euro-score.vercel.app/

## Features

- User registration
- User login
- Football badge guessing game
- Multiple difficulty levels
- PostgreSQL database integration
- Real football club data from an external API

## Technologies

- Node.js
- Express
- PostgreSQL
- EJS
- JavaScript
- HTML & CSS
- TheSportsDB API

## Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/EuroScore.git
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
DB_USER=
DB_HOST=
DB_NAME=
DB_PASSWORD=
DB_PORT=
```

Run the application:

```bash
npm start
```

## Project Structure

```text
EuroScore/
├── public/
├── views/
├── app.js
├── package.json
├── .env.example
└── README.md
```

## Future Improvements

- Password hashing with bcrypt
- User sessions and authentication middleware
- Global leaderboard
- Personal statistics tracking
- Improved difficulty system
- Mobile-friendly UI
- Admin panel for managing users
- Deployment to Render or Railway

---

# 🇪🇸 Versión en Español

## Descripción

EuroScore es una aplicación web desarrollada con Node.js, Express, PostgreSQL y EJS. Permite registrar usuarios, iniciar sesión y jugar a un juego de adivinanza de escudos de clubes de fútbol utilizando datos obtenidos desde la API de TheSportsDB.

## Funcionalidades

- Registro de usuarios
- Inicio de sesión
- Juego de adivinanza de escudos
- Niveles de dificultad
- Integración con PostgreSQL
- Consumo de API externa

## Tecnologías Utilizadas

- Node.js
- Express
- PostgreSQL
- EJS
- JavaScript
- HTML y CSS
- TheSportsDB API

## Instalación

Instalar dependencias:

```bash
npm install
```

Crear un archivo `.env` con las credenciales de la base de datos:

```env
DB_USER=
DB_HOST=
DB_NAME=
DB_PASSWORD=
DB_PORT=
```

Iniciar la aplicación:

```bash
npm start
```

## Posibles Mejoras Futuras

- Almacenamiento seguro de contraseñas mediante bcrypt
- Sistema de sesiones de usuario
- Ranking global de jugadores
- Historial de partidas y estadísticas
- Diseño responsive para dispositivos móviles
- Nuevos modos de juego
- Despliegue en la nube
