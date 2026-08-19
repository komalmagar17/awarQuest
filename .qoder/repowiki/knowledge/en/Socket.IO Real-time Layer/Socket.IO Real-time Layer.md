---
kind: external_dependency
name: Socket.IO Real-time Layer
slug: socketio
category: external_dependency
category_hints:
    - framework_behavior
scope:
    - '**'
source_files:
    - backend/package.json
    - backend/sockets/index.js
    - PRD.md
---

Socket.IO is included as a dependency for real-time communication (currently scaffolded under `backend/sockets/index.js` and noted in the PRD as 'potentially expanded multiplayer or live feedback features'). It sits alongside the Express REST API and can be used for live hints, multiplayer coordination, or real-time progress updates once wired into routes/controllers.