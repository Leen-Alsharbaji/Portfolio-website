import * as THREE from 'three';
import { GLTFLoader } from 'https://unpkg.com/three@0.178.0/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer, model;
let ghostModel = null;

const di = document.getElementById("model-container");
var modelpath , positionX,positionY, positionZ,rotationX, rotationY, rotationZ , scaleX, scaleY, scaleZ;
console.log("im working babyyy");
init();
loadModel('tryForModel/stand.glb' , -2,0.4,-2.5,0,0,0,1.2,1,1);
loadModel('tryForModel/ghoswithtexture1111t.gltf',-1,0,-3,0.1,-1.7,0,2.5,2.5,2.5);
//loadModel ('tryForModel/sunflower1.glb',5,5,2,0,0,0,1,1,1);
animate();

function init() {
    scene = new THREE.Scene();
    scene.background = null;

    camera = new THREE.PerspectiveCamera(60, di.clientWidth / di.clientHeight, 0.1, 100);
    camera.position.set(-2, 3.2, 5.7);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setSize(di.clientWidth, di.clientHeight);
    renderer.physicallyCorrectLights = true;
    di.appendChild(renderer.domElement);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // optional, for softer shadows

    // Directional light — softened and tinted slightly pink
const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(-50, 10, 50);
light.castShadow = true;
scene.add(light);

// Ambient Light – neutral soft fill (just a hint of pinkish warmth)
const ambientLight = new THREE.AmbientLight(0xF2F0F5, 0.6);
scene.add(ambientLight);

// Hemisphere Light – sky light cool white, ground light gentle gray-mauve
const hemiLight = new THREE.HemisphereLight(0xeeeeff, 0xcfcad8, 0.4);
scene.add(hemiLight);

    // Handle window resize
    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = di.clientWidth / di.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(di.clientWidth, di.clientHeight);
}

function loadModel(modelpath, positionX, positionY, positionZ, rotationX, rotationY, rotationZ, scaleX, scaleY, scaleZ) {
    const loader = new GLTFLoader();
    loader.load(modelpath, (gltf) => {
        const loadedModel = gltf.scene;
        loadedModel.position.set(positionX, positionY, positionZ);
        loadedModel.rotation.set(rotationX, rotationY, rotationZ);
        loadedModel.scale.set(scaleX, scaleY, scaleZ);
        scene.add(loadedModel);
        console.log("Model loaded successfully:", modelpath);

        // Set shadow properties based on which model is loaded
        if (modelpath.includes('ghos')) {
            ghostModel = loadedModel;
            loadedModel.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = false;
                }
            });
        } else if (modelpath.includes('stand')) {
            
            loadedModel.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = false;
                    child.receiveShadow = true;
                }
            });
        }
    }, undefined, (error) => {
        console.error("Error loading model:", error);
    });
}

let floatTime = 0;

function animate() {
    requestAnimationFrame(animate);

    if (ghostModel) {
        floatTime += 0.03; // Adjust speed here
        ghostModel.position.y = 0.2 + Math.sin(floatTime) * 0.2; // base height + amplitude
    }

    renderer.render(scene, camera);
}