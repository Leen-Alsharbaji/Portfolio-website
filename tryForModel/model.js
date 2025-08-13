import * as THREE from 'three';
import { GLTFLoader } from 'https://unpkg.com/three@0.178.0/examples/jsm/loaders/GLTFLoader.js';
import { CameraHelper } from 'three';


let scene, camera, renderer, model;
let ghostModel = null;
const di = document.getElementById("Model-container");
var modelpath , positionX,positionY, positionZ,rotationX, rotationY, rotationZ , scaleX, scaleY, scaleZ;





console.log("im working babyyy");
init();
loadModel('tryForModel/ghoswithtexture1111t.gltf',3 ,-4,-3,0,-2,0,4.5,3.5,3.5);
animate();




function init() {
    scene = new THREE.Scene();
    scene.background = null;
    window.addEventListener('resize', onWindowResize);
//add camera
    camera = new THREE.PerspectiveCamera(60, di.clientWidth / di.clientHeight, 0.1, 100);
    camera.position.set(-2, 3.2, 5.7);
  

//renderer settings
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setSize(di.clientWidth, di.clientHeight);
    renderer.physicallyCorrectLights = true;
    di.appendChild(renderer.domElement);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; 

//add floor
const floorGeometry = new THREE.PlaneGeometry(30, 30); 
const floorMaterial = new THREE.ShadowMaterial({
    transparent: true,
    opacity: 0.15, 
});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -2; 
floor.receiveShadow = true; 
scene.add(floor);


// add lighting
const light = new THREE.DirectionalLight(0xffffff, 1.5);
light.position.set(-40, 70, 60);
light.castShadow = true;
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xF2F0F5, 1);
scene.add(ambientLight);

const hemiLight = new THREE.HemisphereLight(0xeeeeff, 0xcfcad8, 1);
scene.add(hemiLight);   
}


//window resize -make model responsive

function onWindowResize() {

  const width = di.clientWidth ;
  const height = di.clientHeight ;


  console.log(`Resize event triggered: width=${width}, height=${height} area=${width*height}`);
  camera.aspect = width / height;
 
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
  renderer.render(scene, camera);

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
        ghostModel.position.y = ghostModel.position.y + Math.sin(floatTime) * 0.01;
      
    }
    
    renderer.render(scene, camera);

}

