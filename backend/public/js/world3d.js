import * as THREE from 'three';

const MOVE_SPEED = 4.5;
const LOOK_SENSITIVITY = 0.002;
const INTERACT_DIST = 2.2;

export class AwarQuestWorld {
  constructor(container, options = {}) {
    this.container = container;
    this.onInteract = options.onInteract || (() => {});
    this.onReady = options.onReady || (() => {});
    this.worldConfig = options.worldConfig || {};
    this.collectedClueIds = new Set(options.collectedClueIds || []);
    this.disposed = false;

    this.keys = {};
    this.yaw = 0;
    this.pitch = 0;
    this.playerPos = new THREE.Vector3(0, 1.6, 3.5);
    this.nearestObject = null;
    this.clock = new THREE.Clock();

    this._bindEvents();
    this._initScene();
    this._buildRoom();
    this._buildObjects();
    this._animate();
    this.onReady();
  }

  _bindEvents() {
    this._onKeyDown = (e) => { this.keys[e.code] = true; };
    this._onKeyUp = (e) => { this.keys[e.code] = false; };
    this._onMouseMove = (e) => {
      if (!this.pointerLocked) return;
      this.yaw -= e.movementX * LOOK_SENSITIVITY;
      this.pitch -= e.movementY * LOOK_SENSITIVITY;
      this.pitch = Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, this.pitch));
    };
    this._onClick = () => {
      if (!this.pointerLocked) {
        this.container.requestPointerLock();
        return;
      }
      if (this.nearestObject && !this.collectedClueIds.has(this.nearestObject.userData.clueId)) {
        this.onInteract(this.nearestObject.userData);
      }
    };
    this._onPointerLockChange = () => {
      this.pointerLocked = document.pointerLockElement === this.container;
      this.container.classList.toggle('locked', this.pointerLocked);
    };
    this._onResize = () => this._resize();

    window.addEventListener('keydown', this._onKeyDown);
    window.addEventListener('keyup', this._onKeyUp);
    window.addEventListener('mousemove', this._onMouseMove);
    window.addEventListener('pointerlockchange', this._onPointerLockChange);
    window.addEventListener('resize', this._onResize);
    this.container.addEventListener('click', this._onClick);
  }

  _initScene() {
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;

    this.scene = new THREE.Scene();
    const sky = this.worldConfig.accent || 0x3b82f6;
    this.scene.background = new THREE.Color(this.worldConfig.wallColor || 0x1a2332);
    this.scene.fog = new THREE.Fog(this.worldConfig.wallColor || 0x1a2332, 8, 22);

    this.camera = new THREE.PerspectiveCamera(70, w / h, 0.1, 50);
    this.camera.position.copy(this.playerPos);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.container.appendChild(this.renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 0.45);
    this.scene.add(ambient);

    const mainLight = new THREE.DirectionalLight(0xffffff, 0.85);
    mainLight.position.set(4, 8, 2);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.set(1024, 1024);
    this.scene.add(mainLight);

    const accentLight = new THREE.PointLight(sky, 0.6, 12);
    accentLight.position.set(0, 3, -2);
    this.scene.add(accentLight);

    this.interactables = [];
    this.particles = [];
  }

  _buildRoom() {
    const floorColor = this.worldConfig.floorColor || 0x243044;
    const wallColor = this.worldConfig.wallColor || 0x1a2332;

    const floorGeo = new THREE.PlaneGeometry(14, 14);
    const floorMat = new THREE.MeshStandardMaterial({ color: floorColor, roughness: 0.85 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    this.scene.add(floor);

    const grid = new THREE.GridHelper(14, 14, 0x3b82f6, 0x2d3f56);
    grid.position.y = 0.01;
    grid.material.opacity = 0.25;
    grid.material.transparent = true;
    this.scene.add(grid);

    const wallMat = new THREE.MeshStandardMaterial({ color: wallColor, roughness: 0.9 });
    const backWall = new THREE.Mesh(new THREE.PlaneGeometry(14, 5), wallMat);
    backWall.position.set(0, 2.5, -4);
    this.scene.add(backWall);

    const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(14, 5), wallMat);
    leftWall.position.set(-7, 2.5, 3);
    leftWall.rotation.y = Math.PI / 2;
    this.scene.add(leftWall);

    const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(14, 5), wallMat);
    rightWall.position.set(7, 2.5, 3);
    rightWall.rotation.y = -Math.PI / 2;
    this.scene.add(rightWall);

    const desk = new THREE.Mesh(
      new THREE.BoxGeometry(4, 0.12, 1.2),
      new THREE.MeshStandardMaterial({ color: 0x4a3728 })
    );
    desk.position.set(0, 0.75, -1.8);
    desk.castShadow = true;
    desk.receiveShadow = true;
    this.scene.add(desk);

    const deskLegMat = new THREE.MeshStandardMaterial({ color: 0x3d2b1f });
    [[-1.8, -2.3], [1.8, -2.3], [-1.8, -1.3], [1.8, -1.3]].forEach(([x, z]) => {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.75, 0.1), deskLegMat);
      leg.position.set(x, 0.375, z);
      this.scene.add(leg);
    });

    const spawn = this.worldConfig.spawn || { x: 0, z: 3.5 };
    this.playerPos.set(spawn.x, 1.6, spawn.z);
  }

  _createProp(shape, color) {
    const mat = new THREE.MeshStandardMaterial({ color, metalness: 0.2, roughness: 0.5 });
    if (shape === 'phone') {
      const g = new THREE.Group();
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.7, 0.06), mat);
      body.castShadow = true;
      g.add(body);
      const screen = new THREE.Mesh(
        new THREE.PlaneGeometry(0.28, 0.5),
        new THREE.MeshStandardMaterial({ color: 0x111827, emissive: color, emissiveIntensity: 0.15 })
      );
      screen.position.z = 0.04;
      g.add(screen);
      return g;
    }
    if (shape === 'laptop') {
      const g = new THREE.Group();
      const base = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.04, 0.6), mat);
      base.castShadow = true;
      g.add(base);
      const lid = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.6, 0.04), mat);
      lid.position.set(0, 0.3, -0.28);
      lid.rotation.x = -0.35;
      lid.castShadow = true;
      g.add(lid);
      const screen = new THREE.Mesh(
        new THREE.PlaneGeometry(0.75, 0.45),
        new THREE.MeshStandardMaterial({ color: 0x0f172a, emissive: color, emissiveIntensity: 0.2 })
      );
      screen.position.set(0, 0.3, -0.26);
      screen.rotation.x = -0.35;
      g.add(screen);
      return g;
    }
    const tablet = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.75, 0.05), mat);
    tablet.castShadow = true;
    return tablet;
  }

  _buildObjects() {
    const objects = this.worldConfig.objects || [];
    objects.forEach((cfg) => {
      const prop = this._createProp(cfg.shape || 'tablet', cfg.color || 0x3b82f6);
      prop.position.set(cfg.x, cfg.shape === 'laptop' ? 0.82 : 0.95, cfg.z);
      if (cfg.shape === 'phone') prop.rotation.y = Math.random() * 0.4 - 0.2;
      prop.userData = {
        id: cfg.id,
        label: cfg.label,
        clueId: cfg.clueId,
        color: cfg.color
      };
      prop.userData.baseY = prop.position.y;
      this.scene.add(prop);
      this.interactables.push(prop);

      const ringGeo = new THREE.RingGeometry(0.35, 0.42, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: cfg.color || 0x3b82f6,
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = -Math.PI / 2;
      ring.position.set(cfg.x, 0.02, cfg.z);
      ring.userData.parentProp = prop;
      this.scene.add(ring);
      prop.userData.ring = ring;
    });
  }

  _updateMovement(dt) {
    const forward = new THREE.Vector3(-Math.sin(this.yaw), 0, -Math.cos(this.yaw));
    const right = new THREE.Vector3(Math.cos(this.yaw), 0, -Math.sin(this.yaw));
    const move = new THREE.Vector3();

    if (this.keys['KeyW'] || this.keys['ArrowUp']) move.add(forward);
    if (this.keys['KeyS'] || this.keys['ArrowDown']) move.sub(forward);
    if (this.keys['KeyA'] || this.keys['ArrowLeft']) move.sub(right);
    if (this.keys['KeyD'] || this.keys['ArrowRight']) move.add(right);

    if (move.lengthSq() > 0) {
      move.normalize().multiplyScalar(MOVE_SPEED * dt);
      this.playerPos.add(move);
      this.playerPos.x = THREE.MathUtils.clamp(this.playerPos.x, -6, 6);
      this.playerPos.z = THREE.MathUtils.clamp(this.playerPos.z, -3, 6);
    }

    this.camera.position.copy(this.playerPos);
    this.camera.rotation.order = 'YXZ';
    this.camera.rotation.y = this.yaw;
    this.camera.rotation.x = this.pitch;
  }

  _updateInteractables(time) {
    let nearest = null;
    let nearestDist = INTERACT_DIST;

    this.interactables.forEach((obj) => {
      const collected = this.collectedClueIds.has(obj.userData.clueId);
      const dist = this.playerPos.distanceTo(obj.position);

      if (obj.userData.ring) {
        obj.userData.ring.visible = !collected;
        obj.userData.ring.material.opacity = collected ? 0 : 0.35 + Math.sin(time * 3) * 0.15;
      }

      obj.position.y = obj.userData.baseY + (collected ? 0 : Math.sin(time * 2 + obj.position.x) * 0.04);

      if (!collected && dist < nearestDist) {
        nearest = obj;
        nearestDist = dist;
      }

      const mat = obj.children?.[0]?.material || obj.material;
      if (mat && mat.emissive) {
        mat.emissiveIntensity = collected ? 0.05 : (nearest === obj ? 0.45 : 0.15);
      }
    });

    this.nearestObject = nearest;
    return nearest;
  }

  _animate() {
    if (this.disposed) return;
    this.raf = requestAnimationFrame(() => this._animate());

    const dt = Math.min(this.clock.getDelta(), 0.05);
    const time = this.clock.elapsedTime;

    this._updateMovement(dt);
    const nearest = this._updateInteractables(time);
    this._updateParticles(dt);

    this.renderer.render(this.scene, this.camera);

    window.dispatchEvent(new CustomEvent('world:interact-hint', {
      detail: {
        object: nearest ? nearest.userData : null,
        pointerLocked: this.pointerLocked
      }
    }));
  }

  markClueCollected(clueId) {
    this.collectedClueIds.add(clueId);
    this._spawnCollectEffect(clueId);
  }

  _spawnCollectEffect(clueId) {
    const obj = this.interactables.find(o => o.userData.clueId === clueId);
    if (!obj) return;

    for (let i = 0; i < 12; i++) {
      const geo = new THREE.SphereGeometry(0.04, 6, 6);
      const mat = new THREE.MeshBasicMaterial({ color: obj.userData.color || 0xfbbf24 });
      const p = new THREE.Mesh(geo, mat);
      p.position.copy(obj.position);
      p.userData.vel = new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        Math.random() * 2 + 1,
        (Math.random() - 0.5) * 2
      );
      p.userData.life = 1;
      this.scene.add(p);
      this.particles.push(p);
    }
  }

  _updateParticles(dt) {
    this.particles = this.particles.filter(p => {
      p.userData.life -= dt * 1.5;
      p.position.addScaledVector(p.userData.vel, dt);
      p.userData.vel.y -= 3 * dt;
      p.material.opacity = p.userData.life;
      if (p.userData.life <= 0) {
        this.scene.remove(p);
        p.geometry.dispose();
        p.material.dispose();
        return false;
      }
      return true;
    });
  }

  _resize() {
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    if (!w || !h) return;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    window.removeEventListener('keydown', this._onKeyDown);
    window.removeEventListener('keyup', this._onKeyUp);
    window.removeEventListener('mousemove', this._onMouseMove);
    window.removeEventListener('pointerlockchange', this._onPointerLockChange);
    window.removeEventListener('resize', this._onResize);
    this.container.removeEventListener('click', this._onClick);
    if (document.pointerLockElement === this.container) document.exitPointerLock();
    this.renderer.dispose();
    if (this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
  }
}

window.AwarQuestWorld = AwarQuestWorld;
