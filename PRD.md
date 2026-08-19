# **Product Requirements Document: AwarQuest**

## **1. Project Overview**
**AwarQuest** is an immersive 3D gamified learning platform designed to equip users with essential real-world skills. Unlike traditional quiz-based learning, it uses a 3D investigation environment where players navigate real-life scenarios (like home offices or classrooms) to identify digital threats, career opportunities, and financial traps.

## **2. Target Audience**
- **Students & Young Adults**: To build awareness of digital safety, career growth, and financial literacy.
- **General Users**: Anyone looking to understand modern digital scams (OTP, UPI, Job fraud) and access official Indian government resources.

## **3. Core Features**
- **3D Investigation Engine**: A `Three.js` based environment where players use WASD controls to explore scenes and interact with glowing objects.
- **Skill Puzzles**: Mini-games (Pick-one, Pick-many, Match-pairs) that teach specific concepts like spotting "red flags" in messages or verifying official portals.
- **Quest System**: Five core missions covering:
    - **Digital Safety**: OTP call scams.
    - **Career Smarts**: Fake job offers.
    - **Money Skills**: UPI refund scams.
    - **Empathy & Safety**: Cyberbullying reporting.
    - **Education Guard**: Verifying scholarship portals (`.gov.in`).
- **AI Life Guide**: A Gemini-powered AI agent providing real-time hints and guidance during quests.
- **Resource Catalogue**: A comprehensive directory of 28 Indian States and 8 UTs, linking users to official `.gov.in` services for skills, health, and legal aid.
- **Progress Tracking**: XP, stars, and skill badges to reward successful completion and safe decision-making.

## **4. Technical Architecture**
- **Frontend**: Web-based 3D UI using `Three.js` and standard JavaScript for game logic.
- **Backend API**: Node.js with Express, providing RESTful endpoints for game state, auth, and analytics.
- **AI Service**: A standalone FastAPI service integrating Google Gemini for intelligent interactions.
- **Database**: PostgreSQL managed via Sequelize ORM for user profiles, quest progress, and audit logs.
- **Real-time**: Socket.io for potentially expanded multiplayer or live feedback features.

## **5. Data Models**
- `User` / `PlayerProfile`: Authentication and personal stats.
- `Scenario`: Definitions for quests, clues, and 3D world configurations.
- `PlayerProgress` / `PlayerSkill`: Detailed logs of user achievements and skill levels.
- `GovResource`: A curated list of verified Indian government links.
- `AiInteraction`: Logs for AI-driven guidance.
- `AuditEvent` / `AnalyticsEvent`: Security and usage tracking.

## **6. API Strategy**
- **Auth**: JWT-based secure login and registration.
- **Game Flow**: Endpoints for starting challenges, submitting evidence, and claiming rewards.
- **Resources**: Filterable access to the Integrated Government Online Directory (IGOD).
- **AI**: Secure bridge between the game client and the LLM provider.

## **7. Future Scope**
- **Multi-region Support**: Expanding resource filters for more localized services.
- **Advanced Analytics**: Deeper insights into user learning gaps based on puzzle failures.
- **Multiplayer Quests**: Collaborative 3D investigation modes.
