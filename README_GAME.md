# AwarQuest — 3D Skill Quest Game

## Quick Start (Docker)

```bash
docker compose up -d --build
docker exec awarquest_api node scripts/seed-scenarios.js
```

Open the game at **http://localhost:5001**

## Backend Only

From `backend/`:

```bash
npm install
cp .env.example .env   # configure PostgreSQL + JWT secrets
npm run seed           # load 5 missions
npm start              # API + game UI at http://localhost:5000
```

## What Makes This Different

This is **not** a Portal clone or a flat quiz app. It is a **3D investigation game** where you:

1. **Enter a 3D scene** modeled after real-life situations (home desk, classroom, café…)
2. **Walk around** with WASD and investigate glowing objects (phone, laptop, documents)
3. **Solve skill puzzles** before collecting each piece of evidence — puzzles teach *how* scams and safety issues work in practice
4. **Make a final decision** like you would in real life
5. **Earn XP, stars, and skill badges** (Digital Safety, Career Smarts, Money Skills, etc.)

## How to Play

### Controls

| Input | Action |
|-------|--------|
| **Click scene** | Lock mouse / look around |
| **WASD** | Move in the 3D world |
| **Click object** or **E** | Investigate (starts skill puzzle) |
| **Life Guide chat** | Ask for hints anytime |

### Quest Flow

1. **Read the situation brief** on screen
2. Click **Enter 3D Scene**
3. **Investigate every glowing object** — each has a mini-puzzle (spot red flags, match official portals, etc.)
4. After all evidence is collected, **choose the safest real-world action**
5. Review outcome, learning objectives, and **claim rewards**
6. Check **Verified Resources** for official `.gov.in` help links

### Quests (complete all 5)

| # | Quest | Skill | Real-world topic |
|---|-------|-------|------------------|
| 1 | The Urgent OTP Call | Digital Safety | OTP scams, bank verification |
| 2 | Too Good to Be True Job | Career Smarts | Fake job offers, registration fees |
| 3 | The "Wrong Transfer" Trick | Money Skills | UPI refund scams, fake screenshots |
| 4 | Stand Up Safely Online | Empathy & Safety | Cyberbullying, evidence, reporting |
| 5 | Fake Scholarship Portal | Education Guard | `.gov.in` verification, NSP |

### Win Condition

- Complete **all 5 quests**
- Earn **3 stars** on each (choose the safest option)
- Solve **all skill puzzles** to collect full evidence

## Puzzle System

Puzzles live in `backend/public/js/puzzles.js` — one per clue, keyed by clue ID:

- **pick-one** — identify scam tactics vs legitimate messages
- **pick-many** — spot multiple red flags in a job offer or reporting checklist
- **match-pairs** — match situations to correct verification methods

Each puzzle includes a **skill tip** explaining the real-world principle.

## 3D Worlds

World layouts live in `backend/public/js/puzzles.js` (`MISSION_WORLDS`) and `backend/public/js/world3d.js` (Three.js engine).

## API Endpoints

- `POST /api/v1/auth/register` — create account
- `POST /api/v1/auth/login` — get JWT token
- `GET /api/v1/game/challenges` — list quests
- `POST /api/v1/game/start` — begin a quest
- `POST /api/v1/game/action` — collect evidence, choose option, complete
- `POST /api/v1/game/chat` — Life Guide AI hints
- `POST /api/v1/progress/submit` — save quest results

## Production Notes

Use HTTPS, replace development secrets, enable PostgreSQL migrations (`AUTO_SYNC=false`), configure CORS for your domain, and add refresh-token rotation before public release.
