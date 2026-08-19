---
kind: business_term
name: Business Glossary
category: business_term
scope:
    - '**'
---

### AwarQuest
- Definition：The current public-facing project name for the Life Skills Adventure game platform, replacing the earlier 'Life Skills Adventure' branding across UI strings and HTML titles.
- Aliases：awarquest

### Guest Login
- Definition：A guest-mode entry path that lets users start playing without creating an account; the flow goes through `POST /api/v1/auth/guest-login` and lands directly on the Skill Quests screen with mock mission data populated.
- Aliases：guest mode、guest play

### Skill Quests
- Definition：The post-authentication screen where players view and begin the five core missions (OTP scam, fake job offer, UPI refund scam, cyberbullying reporting, fake scholarship portal). Each quest teaches a life-skill domain: Digital Safety, Career Smarts, Money Skills, Empathy & Safety, Education Guard.
- Aliases：quests、missions

### Life Guide
- Definition：The in-game AI assistant powered by Google Gemini that provides real-time hints and guidance while players investigate 3D scenes and solve skill puzzles. Accessed via the `/api/v1/game/chat` endpoint.
- Aliases：AI Life Guide、AI agent

### Verified Resources
- Definition：Official `.gov.in` help links and schemes surfaced after quest completion, drawn from the IGOD/myScheme catalogue so players can take real-world action (reporting scams, accessing government services).
- Aliases：gov resources、resource catalogue

### XP / Stars / Skill Badges
- Definition：The three-tier reward system tracking player performance: XP for participation, stars earned by choosing the safest option per quest (win condition requires 3 stars on each of the 5 quests), and skill badges awarded per completed skill domain.
- Aliases：rewards、progress tracking

### Puzzle Types
- Definition：Mini-games embedded in each clue of a quest: pick-one (identify one red flag among options), pick-many (spot multiple red flags), and match-pairs (match situations to correct verification methods). Each puzzle includes a skill tip explaining the real-world principle.
- Aliases：skill puzzles、mini-games

### 3D Scene Investigation
- Definition：The core gameplay loop: players enter a Three.js 3D world modeled after real-life settings, walk around with WASD, click or press E to investigate glowing objects, collect evidence through puzzles, then make a final real-world decision.
- Aliases：3D scene、investigation mode
