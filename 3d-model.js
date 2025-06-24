import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;


function init3DScene() {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const container = document.getElementById("container3D");
  if (!container) return;

  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    1,
    1000
  );

  camera.position.set(0, 0, 8);

const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.minDistance = 4;
  controls.maxDistance = 15;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1;
  controls.update();

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  // Load Earth model
  const loader = new GLTFLoader();
  loader.load(
    "./models/earth/scene.gltf",
    (gltf) => {
      const model = gltf.scene;
      model.scale.set(0.2, 0.2, 0.2); // Adjusted scale to be uniform and larger
      model.position.set(0, -1.5, -0.5); // Centered the model
      scene.add(model);
    },
    undefined,
    (error) => {
      console.error("Error loading model:", error);
    }
  );

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  // Handle window resize
  window.addEventListener("resize", () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  animate();
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", init3DScene);












// const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
// groundGeometry.rotateX(-Math.PI / 2);
// const groundMaterial = new THREE.MeshStandardMaterial({
//   color: 0x555555,
//   side: THREE.DoubleSide,
// });
// const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
// groundMesh.castShadow = false;
// groundMesh.receiveShadow = true;
// scene.add(groundMesh);

// const spotLight = new THREE.SpotLight(0xffffff, 3, 100, 0.2, 0.5);
// spotLight.position.set(0, 25, 0);
// spotLight.castShadow = true;
// spotLight.shadow.bias = -0.0001;
// scene.add(spotLight);

// const loader = new GLTFLoader().setPath("models/earth/");
// loader.load("scene.gltf", (gltf) => {
//   const mesh = gltf.scene;

//   mesh.traverse((child) => {
//     if (child.isMesh) {
//       child.castShadow = true;
//       child.receiveShadow = true;
//     }
//   });

//   mesh.position.set(0, 1.05, -1);
//   scene.add(mesh);
// });

// function animate() {
//   requestAnimationFrame(animate);
//   renderer.render(scene, camera);
// }

// animate();
