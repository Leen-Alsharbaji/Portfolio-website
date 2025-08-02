import * as THREE from 'three';
import { GLTFLoader } from 'https://unpkg.com/three@0.178.0/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer, model;
let ghostModel = null;

const di = document.getElementById("model-container");
var modelpath , positionX,positionY, positionZ,rotationX, rotationY, rotationZ , scaleX, scaleY, scaleZ;
console.log("im working babyyy");
init();
loadModel('tryForModel/stand.glb' , -1.35,0.01,-3 ,0,0,0,1,0.5,1);
loadModel('tryForModel/ghoswithtexture1111t.gltf',0,0.2,0,0,-1.3,0,1,1,1);
animate();

function init() {
    scene = new THREE.Scene();
    scene.background = null;

    camera = new THREE.PerspectiveCamera(60, di.clientWidth / di.clientHeight, 0.1, 100);
    camera.position.set(0, 2.3, 5);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setSize(di.clientWidth, di.clientHeight);
    renderer.physicallyCorrectLights = true;
    di.appendChild(renderer.domElement);

    // Enable shadow maps in the renderer
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // optional, for softer shadows

    const light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(20, 10, 20);
    light.castShadow = true; // <--- IMPORTANT
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xF2EAE4));
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444445, 0.5);
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