import * as THREE from 'three';
import { GLTFLoader } from 'https://unpkg.com/three@0.178.0/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer, model;
let ghostModel = null;

const di = document.getElementById("model-container");
var modelpath , positionX,positionY, positionZ,rotationX, rotationY, rotationZ , scaleX, scaleY, scaleZ;
console.log("im working babyyy");
init();
//loadModel('tryForModel/stand.glb' , -2.2,-2,-2.5,0,0,0,1.2,1,1);
loadModel('tryForModel/ghoswithtexture1111t.gltf',3,-4,-3,0,-2,0,4.5,3.5,3.5);
//loadModel ('tryForModel/glass_or_reflection_cube.glb',3,5,0,0,0,0,0.5,0.5,0.5);
animate();

function init() {
    scene = new THREE.Scene();
    scene.background = null;

    camera = new THREE.PerspectiveCamera(65, di.clientWidth / di.clientHeight, 0.1, 100);
    camera.position.set(-2, 3.2, 5.7);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setSize(di.clientWidth, di.clientHeight);
    renderer.physicallyCorrectLights = true;
    di.appendChild(renderer.domElement);

    renderer.shadowMap.enabled = true;
    //renderer.shadowMap.type = THREE.PCFSoftShadowMap; // optional, for softer shadows

// Add invisible shadow-receiving floor
const floorGeometry = new THREE.PlaneGeometry(30, 30); // Large floor
const floorMaterial = new THREE.ShadowMaterial({
    transparent: true,
    opacity: 0.15, // Fully invisible (but still catches shadows)
});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);

floor.rotation.x = -Math.PI / 2; // Rotate to be horizontal
floor.position.y = -2; // Adjust if your models are floating
floor.receiveShadow = true; // Critical for shadows to appear!
scene.add(floor);



    const light = new THREE.DirectionalLight(0xffffff, 1.5);
light.position.set(-40, 70, 60);
light.castShadow = true;
scene.add(light);


const ambientLight = new THREE.AmbientLight(0xF2F0F5, 1);
scene.add(ambientLight);


const hemiLight = new THREE.HemisphereLight(0xeeeeff, 0xcfcad8, 1);
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
        floatTime += 0.03; 
        ghostModel.position.y = ghostModel.position.y + Math.sin(floatTime) * 0.01; // base height + amplitude
    }

    renderer.render(scene, camera);
}