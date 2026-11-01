import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { COLORS, TRACK, SAFE_CELLS, HOME_LANES, tokenTrackIndex } from "./game.js";

const BOARD_SIZE = 15;
const pointAt = (row, col) => new THREE.Vector3(col - 7, 0, row - 7);
const homeYards = [
  [[1, 10], [4, 10], [1, 13], [4, 13]],
  [[1, 1], [4, 1], [1, 4], [4, 4]],
  [[10, 10], [13, 10], [10, 13], [13, 13]],
  [[10, 1], [13, 1], [10, 4], [13, 4]],
];

function makeMaterial(color, roughness = 0.62, extra = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness: 0.03, ...extra });
}

function addBox(parent, color, position, size, materialOptions = {}) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), makeMaterial(color, materialOptions.roughness, materialOptions));
  mesh.position.set(...position);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

function createBoard(scene, theme) {
  const root = new THREE.Group();
  scene.add(root);
  const wood = makeMaterial(theme.surface, 0.36, { metalness: 0.13 });
  const board = new THREE.Mesh(new RoundedBoxGeometry(15.65, 0.62, 15.65, 5, 0.25), wood);
  board.position.y = -0.15;
  board.castShadow = true;
  board.receiveShadow = true;
  root.add(board);

  for (let row = 0; row < BOARD_SIZE; row += 1) {
    for (let col = 0; col < BOARD_SIZE; col += 1) {
      let color = theme.tile;
      if (row < 6 && col < 6) color = COLORS[1].hex;
      else if (row < 6 && col > 8) color = COLORS[2].hex;
      else if (row > 8 && col < 6) color = COLORS[0].hex;
      else if (row > 8 && col > 8) color = COLORS[3].hex;
      addBox(root, color, [col - 7, 0.2, row - 7], [0.94, 0.16, 0.94], {
        roughness: (theme.id === "marble" || theme.id === "royal") ? 0.22 : 0.48,
        metalness: theme.id === "royal" ? 0.2 : 0.02,
      });
    }
  }

  TRACK.forEach(([row, col], index) => {
    const colorIndex = COLORS.findIndex((player) => player.start === index);
    const tint = colorIndex >= 0 ? COLORS[colorIndex].hex : theme.tile;
    addBox(root, tint, [col - 7, 0.32, row - 7], [0.88, 0.13, 0.88], {
      roughness: theme.id === "neon" ? 0.25 : 0.45,
      emissive: theme.id === "neon" ? tint : "#000000",
      emissiveIntensity: theme.id === "neon" ? 0.12 : 0,
    });
    if (SAFE_CELLS.has(index) && colorIndex < 0) {
      const star = new THREE.Mesh(new THREE.OctahedronGeometry(0.18), makeMaterial(theme.accent, 0.28, { metalness: 0.3 }));
      star.position.set(col - 7, 0.51, row - 7);
      star.scale.set(0.7, 0.28, 0.7);
      root.add(star);
    }
  });

  HOME_LANES.forEach((lane, playerIndex) => {
    lane.forEach(([row, col], laneIndex) => {
      addBox(root, COLORS[playerIndex].hex, [col - 7, 0.4, row - 7], [0.9, 0.15, 0.9], {
        roughness: 0.36,
        emissive: theme.id === "neon" ? COLORS[playerIndex].hex : "#000000",
        emissiveIntensity: theme.id === "neon" ? 0.22 : 0,
      });
      if (laneIndex < 5) {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(0.31, 0.025, 8, 24), makeMaterial("#ffffff", 0.3, { transparent: true, opacity: 0.38 }));
        ring.rotation.x = Math.PI / 2;
        ring.position.set(col - 7, 0.5, row - 7);
        root.add(ring);
      }
    });
  });

  const centerShape = new THREE.Shape();
  centerShape.moveTo(-1.5, -1.5);
  centerShape.lineTo(1.5, -1.5);
  centerShape.lineTo(1.5, 1.5);
  centerShape.lineTo(-1.5, 1.5);
  centerShape.closePath();
  const center = new THREE.Mesh(new THREE.ShapeGeometry(centerShape), makeMaterial(theme.accent, 0.4, { metalness: 0.12 }));
  center.rotation.x = -Math.PI / 2;
  center.position.y = 0.48;
  root.add(center);
  const centerDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.88, 0.88, 0.05, 48), makeMaterial("#f3eee1", 0.25, { metalness: 0.24 }));
  centerDisc.position.set(0, 0.55, 0);
  root.add(centerDisc);

  COLORS.forEach((player, index) => {
    const centerRow = index < 2 ? 2.5 : 11.5;
    const centerCol = index % 2 === 0 ? 2.5 : 11.5;
    const plate = new THREE.Mesh(new RoundedBoxGeometry(4.5, 0.12, 4.5, 4, 0.12), makeMaterial("#f4ead8", 0.55));
    plate.position.set(centerCol - 7, 0.42, centerRow - 7);
    root.add(plate);
    for (let slot = 0; slot < 4; slot += 1) {
      const [row, col] = homeYards[index][slot];
      const inset = new THREE.Mesh(new THREE.CylinderGeometry(0.69, 0.72, 0.09, 40), makeMaterial("#d8cbb5", 0.55));
      inset.position.set(col - 7, 0.52, row - 7);
      inset.receiveShadow = true;
      root.add(inset);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.56, 0.028, 8, 36), makeMaterial(player.hex, 0.3, { metalness: 0.2 }));
      ring.rotation.x = Math.PI / 2;
      ring.position.set(col - 7, 0.58, row - 7);
      root.add(ring);
    }
  });
  return root;
}

function makeToken(player, index) {
  const group = new THREE.Group();
  group.name = `token-${player.id}-${index}`;
  group.userData.tokenId = `${player.id}-${index}`;
  const tokenMaterial = makeMaterial(player.hex, 0.2, { metalness: 0.34 });
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.37, 0.42, 0.18, 40), makeMaterial("#f6e8cd", 0.28, { metalness: 0.24 }));
  base.position.y = 0.7;
  base.castShadow = true;
  group.add(base);
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.29, 0.36, 0.45, 40), tokenMaterial);
  body.position.y = 0.97;
  body.castShadow = true;
  group.add(body);
  const shoulder = new THREE.Mesh(new THREE.SphereGeometry(0.3, 32, 24), tokenMaterial);
  shoulder.scale.set(1, 0.82, 1);
  shoulder.position.y = 1.19;
  shoulder.castShadow = true;
  group.add(shoulder);
  const crown = new THREE.Mesh(new THREE.SphereGeometry(0.18, 24, 20), makeMaterial("#fff6e2", 0.18, { metalness: 0.2, transparent: true, opacity: 0.72 }));
  crown.position.set(-0.06, 1.36, -0.1);
  group.add(crown);
  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.025, 8, 40), makeMaterial("#fff4d6", 0.24, { metalness: 0.4, transparent: true, opacity: 0.62 }));
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.77;
  group.add(rim);
  return group;
}

function getTokenPosition(player, tokenIndex, progress, players) {
  let grid;
  if (progress === -1) grid = homeYards[player.home][tokenIndex];
  else if (progress === 57) grid = [7, 7];
  else if (progress >= 52) grid = HOME_LANES[player.home][progress - 52];
  else grid = TRACK[tokenTrackIndex(player, progress)];
  const angle = tokenIndex * Math.PI / 2;
  const spread = progress < 0 ? 0 : 0.14;
  const pos = pointAt(grid[0], grid[1]);
  return [pos.x + Math.cos(angle) * spread, 0, pos.z + Math.sin(angle) * spread];
}

const faceValues = [
  { normal: [0, 1, 0], value: 1 }, { normal: [0, -1, 0], value: 6 },
  { normal: [1, 0, 0], value: 3 }, { normal: [-1, 0, 0], value: 4 },
  { normal: [0, 0, 1], value: 2 }, { normal: [0, 0, -1], value: 5 },
];

function orientationForTop(value) {
  for (let x = 0; x < 4; x += 1) {
    for (let y = 0; y < 4; y += 1) {
      for (let z = 0; z < 4; z += 1) {
        const euler = new THREE.Euler(x * Math.PI / 2, y * Math.PI / 2, z * Math.PI / 2, "XYZ");
        const quaternion = new THREE.Quaternion().setFromEuler(euler);
        const topValue = faceValues.find((face) => {
          const normal = new THREE.Vector3(...face.normal).applyQuaternion(quaternion);
          return normal.y > 0.999;
        })?.value;
        if (topValue === value) return quaternion;
      }
    }
  }
  return new THREE.Quaternion();
}

function createDie(scene, theme) {
  const group = new THREE.Group();
  group.position.set(0, 0.95, 9.35);
  group.rotation.set(-0.34, 0.55, 0.24);
  const cube = new THREE.Mesh(
    new RoundedBoxGeometry(1.35, 1.35, 1.35, 5, 0.12),
    makeMaterial(theme.finish, theme.id === "diamond" ? 0.12 : 0.24, {
      metalness: ["gold", "carbon", "royal"].includes(theme.id) ? 0.56 : 0.12,
      transparent: theme.id === "diamond",
      opacity: theme.id === "diamond" ? 0.78 : 1,
      emissive: theme.id === "neon" ? theme.finish : "#000000",
      emissiveIntensity: theme.id === "neon" ? 0.42 : 0,
    }),
  );
  cube.castShadow = true;
  group.add(cube);
  const patterns = {
    1: [[0, 0]], 2: [[-1, -1], [1, 1]], 3: [[-1, -1], [0, 0], [1, 1]],
    4: [[-1, -1], [-1, 1], [1, -1], [1, 1]],
    5: [[-1, -1], [-1, 1], [0, 0], [1, -1], [1, 1]],
    6: [[-1, -1], [-1, 0], [-1, 1], [1, -1], [1, 0], [1, 1]],
  };
  faceValues.forEach((face) => {
    const normal = new THREE.Vector3(...face.normal);
    const basisU = new THREE.Vector3(1, 0, 0);
    if (Math.abs(normal.dot(basisU)) > 0.8) basisU.set(0, 0, 1);
    basisU.addScaledVector(normal, -basisU.dot(normal)).normalize();
    const basisV = new THREE.Vector3().crossVectors(normal, basisU).normalize();
    patterns[face.value].forEach(([u, v]) => {
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.105, 16, 12), makeMaterial(theme.dot, 0.35, {
        metalness: theme.id === "gold" ? 0.3 : 0.04,
        emissive: theme.id === "neon" ? theme.dot : "#000000",
        emissiveIntensity: theme.id === "neon" ? 0.55 : 0,
      }));
      dot.position.copy(normal.clone().multiplyScalar(0.684).addScaledVector(basisU, u * 0.29).addScaledVector(basisV, v * 0.29));
      dot.scale.set(1, 0.5, 1);
      group.add(dot);
    });
  });
  const shadow = new THREE.Mesh(new THREE.CylinderGeometry(1.05, 1.05, 0.06, 48), makeMaterial("#17130f", 0.95, { transparent: true, opacity: 0.5 }));
  shadow.position.set(0, -0.68, 0);
  group.add(shadow);
  scene.add(group);
  return group;
}

export default function Board3D({ players, activeIndex, legal, onTokenClick, boardTheme, diceTheme, rollSignal, diceValue, rotating, quality }) {
  const hostRef = useRef(null);
  const sceneRef = useRef(null);
  const propsRef = useRef({});
  const tokenMap = useRef(new Map());
  const callbacksRef = useRef({});
  const orbitRef = useRef({ dragging: false, lastX: 0, lastY: 0, azimuth: 0.84, elevation: 0.76, distance: 23 });

  useEffect(() => { propsRef.current = { players, activeIndex, legal, diceValue, rotating }; }, [players, activeIndex, legal, diceValue, rotating]);
  useEffect(() => { callbacksRef.current = { onTokenClick }; }, [onTokenClick]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#121414");
    scene.fog = new THREE.Fog("#121414", 28, 64);
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ antialias: quality !== "low", alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, quality === "high" ? 2 : 1.5));
    renderer.shadowMap.enabled = quality !== "low";
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.domElement.className = "board-canvas";
    host.appendChild(renderer.domElement);
    sceneRef.current = scene;

    scene.add(new THREE.HemisphereLight("#eee4d0", "#29221a", 2.1));
    const key = new THREE.DirectionalLight("#fff0d6", 3.2);
    key.position.set(-9, 18, 8);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.left = -15;
    key.shadow.camera.right = 15;
    key.shadow.camera.top = 15;
    key.shadow.camera.bottom = -15;
    scene.add(key);
    const fill = new THREE.PointLight("#b5d4ff", 44, 32, 2);
    fill.position.set(10, 12, -9);
    scene.add(fill);

    const table = new THREE.Mesh(new THREE.CylinderGeometry(13, 13.6, 0.6, 96), makeMaterial("#24211e", 0.35, { metalness: 0.17 }));
    table.position.y = -0.66;
    table.receiveShadow = true;
    scene.add(table);
    createBoard(scene, boardTheme);
    const dice = createDie(scene, diceTheme);
    const tokenRoot = new THREE.Group();
    tokenRoot.userData.isTokenRoot = true;
    scene.add(tokenRoot);
    tokenMap.current = new Map();
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const resize = () => {
      const width = Math.max(host.clientWidth, 1);
      const height = Math.max(host.clientHeight, 1);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();

    const positionCamera = () => {
      const orbit = orbitRef.current;
      camera.position.set(
        orbit.distance * Math.sin(orbit.azimuth) * Math.cos(orbit.elevation),
        orbit.distance * Math.sin(orbit.elevation),
        orbit.distance * Math.cos(orbit.azimuth) * Math.cos(orbit.elevation),
      );
      camera.lookAt(0, 0.2, 0);
    };
    positionCamera();
    const pointerDown = (event) => {
      orbitRef.current.dragging = true;
      orbitRef.current.lastX = event.clientX;
      orbitRef.current.lastY = event.clientY;
      renderer.domElement.setPointerCapture?.(event.pointerId);
    };
    const pointerMove = (event) => {
      const orbit = orbitRef.current;
      if (!orbit.dragging) return;
      orbit.azimuth += (event.clientX - orbit.lastX) * 0.006;
      orbit.elevation = THREE.MathUtils.clamp(orbit.elevation + (orbit.lastY - event.clientY) * 0.005, 0.3, 1.28);
      orbit.lastX = event.clientX;
      orbit.lastY = event.clientY;
      positionCamera();
    };
    const pointerUp = () => { orbitRef.current.dragging = false; };
    const wheel = (event) => {
      event.preventDefault();
      orbitRef.current.distance = THREE.MathUtils.clamp(orbitRef.current.distance + event.deltaY * 0.015, 17, 34);
      positionCamera();
    };
    const click = (event) => {
      if (orbitRef.current.dragging) return;
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1);
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(tokenRoot.children, true);
      let hit = hits[0]?.object;
      while (hit && !hit.userData.tokenId && hit.parent) hit = hit.parent;
      if (hit?.userData.tokenId) callbacksRef.current.onTokenClick(hit.userData.tokenId);
    };
    renderer.domElement.addEventListener("pointerdown", pointerDown);
    renderer.domElement.addEventListener("pointermove", pointerMove);
    renderer.domElement.addEventListener("pointerup", pointerUp);
    renderer.domElement.addEventListener("pointerleave", pointerUp);
    renderer.domElement.addEventListener("click", click);
    renderer.domElement.addEventListener("wheel", wheel, { passive: false });

    let frame = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      frame = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const props = propsRef.current;
      tokenMap.current.forEach((entry) => {
        entry.mesh.position.lerp(entry.target, 0.12);
        const isCurrent = entry.playerIndex === props.activeIndex;
        entry.mesh.scale.setScalar(entry.legal ? 1 + Math.sin(elapsed * 5) * 0.06 : 1);
        entry.mesh.position.y = 0.1 + (entry.legal ? Math.sin(elapsed * 4) * 0.09 : 0);
        entry.mesh.traverse((child) => {
          if (child.isMesh && child.material?.emissive) {
            child.material.emissiveIntensity = entry.legal ? 0.45 + Math.sin(elapsed * 5) * 0.16 : (isCurrent ? 0.1 : 0);
          }
        });
      });
      if (props.rotating) {
        dice.rotation.x += 0.23;
        dice.rotation.y += 0.27;
        dice.rotation.z += 0.18;
        dice.position.y = 1.05 + Math.abs(Math.sin(elapsed * 8)) * 0.34;
      } else {
        dice.position.y += (0.95 - dice.position.y) * 0.08;
      }
      renderer.render(scene, camera);
    };
    animate();
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener("pointerdown", pointerDown);
      renderer.domElement.removeEventListener("pointermove", pointerMove);
      renderer.domElement.removeEventListener("pointerup", pointerUp);
      renderer.domElement.removeEventListener("pointerleave", pointerUp);
      renderer.domElement.removeEventListener("click", click);
      renderer.domElement.removeEventListener("wheel", wheel);
      renderer.dispose();
      host.replaceChildren();
      sceneRef.current = null;
    };
  }, [boardTheme, diceTheme, quality]);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const root = scene.children.find((child) => child.userData.isTokenRoot);
    if (!root) return;
    const activeIds = new Set();
    players.forEach((player, playerIndex) => {
      player.tokens.forEach((token, tokenIndex) => {
        activeIds.add(token.id);
        let entry = tokenMap.current.get(token.id);
        if (!entry) {
          const mesh = makeToken(player, tokenIndex);
          root.add(mesh);
          entry = { mesh, target: new THREE.Vector3(), playerIndex, legal: false };
          tokenMap.current.set(token.id, entry);
        }
        const [x, , z] = getTokenPosition(player, tokenIndex, token.progress, players);
        entry.target.set(x, 0, z);
        entry.playerIndex = playerIndex;
        entry.legal = playerIndex === activeIndex && legal.includes(tokenIndex);
        entry.mesh.userData.tokenId = token.id;
        entry.mesh.traverse((child) => { if (child.isMesh) child.userData.tokenId = token.id; });
      });
    });
    tokenMap.current.forEach((entry, id) => {
      if (!activeIds.has(id)) {
        root.remove(entry.mesh);
        tokenMap.current.delete(id);
      }
    });
  }, [players, activeIndex, legal]);

  useEffect(() => {
    const scene = sceneRef.current;
    const die = scene?.children.find((child) => child.position.z > 8);
    if (!die || rotating || !diceValue) return;
    die.quaternion.copy(orientationForTop(diceValue));
  }, [diceValue, rotating, rollSignal]);

  return <div className="board-canvas-host" ref={hostRef} aria-label="Interactive 3D Ludo board. Drag to rotate and use the mouse wheel to zoom." />;
}