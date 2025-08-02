import * as THREE from 'three';
import { GLTFLoader } from 'https://unpkg.com/three@0.178.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://unpkg.com/three@0.178.0/examples/jsm/controls/OrbitControls.js';


let scene, camera, renderer, controls;
let model, mixer, animations = [], currentAnim = 0;

const clock = new THREE.Clock();

init();
loadModel();
animate();

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x222222);

  camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 100);
  camera.position.set(0, 1.5, 3);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);

  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(5, 10, 7.5);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0x404040));
}

function loadModel() {
  const loader = new GLTFLoader();
  loader.load('media/ghost.glb', (gltf) => {
    model = gltf.scene;
    model.scale.set(1, 1, 1);
    scene.add(model);

    // Animations
    animations = gltf.animations;
    if (animations.length) {
      mixer = new THREE.AnimationMixer(model);
      mixer.clipAction(animations[0]).play();
    }
  });
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  if (mixer) mixer.update(delta);
  controls.update();
  renderer.render(scene, camera);
}

// 🔧 Controls
window.rotateModel = function () {
  if (model) model.rotation.y += Math.PI / 8;
};

window.scaleUp = function () {
  if (model) model.scale.multiplyScalar(1.1);
};

window.scaleDown = function () {
  if (model) model.scale.multiplyScalar(0.9);
};

window.moveUp = function () {
  if (model) model.position.y += 0.1;
};

window.changeColor = function () {
  if (!model) return;
  const color = new THREE.Color(Math.random(), Math.random(), Math.random());
  model.traverse((child) => {
    if (child.isMesh) {
      if (child.material) {
        child.material.color = color;
      }
    }
  });
};

window.nextAnim = function () {
  if (!mixer || animations.length < 2) return;
  mixer.stopAllAction();
  currentAnim = (currentAnim + 1) % animations.length;
  const action = mixer.clipAction(animations[currentAnim]);
  action.reset().play();
};
