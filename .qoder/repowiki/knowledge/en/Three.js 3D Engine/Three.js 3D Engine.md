---
kind: external_dependency
name: Three.js 3D Engine
slug: threejs
category: external_dependency
category_hints:
    - framework_behavior
scope:
    - '**'
source_files:
    - backend/public/js/world3d.js
    - backend/public/js/puzzles.js
    - README_GAME.md
---

The 3D investigation engine powering the game scenes (home desk, classroom, café) is built on Three.js. World layouts are defined in `MISSION_WORLDS` within `backend/public/js/puzzles.js`, and the rendering/interaction loop lives in `backend/public/js/world3d.js`. Players navigate with WASD and interact with glowing objects to trigger skill puzzles. This is a client-side library served statically by the Express server; no separate build step is required.