import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
//import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let object;
//let controls;
const gltfLoader = new GLTFLoader();

gltfLoader.load(
    './images/duck/scene.gltf',
    function (gltf) {
        object = gltf.scene;
        //object.position.set(-50, -.7, 0);
        object.scale.set(30, 30, 30);
        //object.rotateX(90);
        scene.add(object);
        /*
        mixer = new THREE.AnimationMixer(object);
        const clips = gltf.animations;
        clips.forEach(function(clip) {
            const action = mixer.clipAction(clip);
            action.play();
        })
        */
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total*100) + '% loaded');
    },
    function (error) {
        console.error(error);
    }
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

camera.position.z = 5;

const topLight = new THREE.DirectionalLight(0xFFFFFF, 5);
scene.add(topLight);

const bottomLight = new THREE.DirectionalLight(0xFFFFFF, 3);
bottomLight.position.set(500,-500,500);
scene.add(bottomLight);

//controls = new OrbitControls(camera, renderer.domElement);

function animate() {
    requestAnimationFrame(animate);
    object.rotation.y = -3 + mouseX / window.innerWidth * 3;
    object.rotation.x = -1.2 + mouseY * 2.5 / window.innerHeight;
    renderer.render(scene, camera);
}

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

document.onmousemove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
}

animate();