import React, { useEffect } from 'react'
import * as THREE from "three"
const { PerspectiveCamera, Scene, WebGLRenderer } = THREE
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { fragment } from './shaders/fragmentShader';
import { vertex } from './shaders/vertexShader';
const glslify = require('glslify')



let camera
let renderer
let controls
let scene


const BuildingCanvas: React.FC = () => {
    let time = 0

    let uniforms = {
        time: { type: "f", value: 1.0 },
        image: { type: 't', value: new THREE.TextureLoader().load('/aa.jpg') },
        resolution: { type: "v4", value: new THREE.Vector4() }
    };
    let material = new THREE.ShaderMaterial({
        side: THREE.DoubleSide,
        uniforms: uniforms,
        vertexShader: vertex(),
        fragmentShader: fragment()
    });
    let plane = new THREE.Mesh(new THREE.PlaneGeometry(3, 3, 3), material);


    useEffect(() => {
        camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer = new WebGLRenderer({ antialias: true });
        scene = new Scene();

        init();
        animate();
    }, [])











    function init() {
        let BuildingCanvasContainer = document.querySelector('#BuildingCanvas')

        let ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
        controls = new OrbitControls(camera, renderer.domElement);

        camera.position.y = 0;
        camera.position.x = 6;

        scene.add(ambientLight);
        scene.add(camera);
        scene.background = new THREE.Color(0xcccccc);
        // scene.background = new THREE.Color().setHSL(0.6, 0, 1);




        // plane.rotation.y = Math.atan2((camera.position.x - plane.position.x), (camera.position.z - plane.position.z));
        console.log(camera);

        plane.receiveShadow = true;
        scene.add(plane);







        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.outputEncoding = THREE.sRGBEncoding;
        BuildingCanvasContainer.appendChild(renderer.domElement);

        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.screenSpacePanning = false;
        // controls.maxPolarAngle = Math.PI / 2;

    }

    function animate() {
        time++
        plane.rotation.y = time * 0.05
        controls.update();
        renderer.render(scene, camera);

        requestAnimationFrame(animate);

    }






    return (
        <div id="BuildingCanvas" />

    )
}



export default BuildingCanvas;