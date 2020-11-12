import React, { useEffect } from 'react'
import * as THREE from "three"
const { PerspectiveCamera, Scene, BoxGeometry, MeshNormalMaterial, Mesh, WebGLRenderer } = THREE
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { TDSLoader } from "three/examples/jsm/loaders/TDSLoader"

let camera
let renderer
let controls
let scene


const BuildingCanvas: React.FC = () => {

    useEffect(() => {

        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer = new WebGLRenderer({ antialias: true });
        scene = new Scene();


        init();
        animate();
    }, [])



    function init() {
        let BuildingCanvasContainer = document.querySelector('#BuildingCanvas')

        let ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
        let pointLight = new THREE.PointLight(0xffffff, 0.8);
        let hemisphereLight = new THREE.HemisphereLight();
        let directionalLight = new THREE.DirectionalLight(0xffeedd);
        let threeDsLoader = new TDSLoader();
        controls = new OrbitControls(camera, renderer.domElement);


        camera.position.z = 2;

        directionalLight.position.set(0, 0, 2);

        scene.add(hemisphereLight);
        scene.add(directionalLight);
        scene.add(ambientLight);
        scene.add(camera);
        scene.add(ambientLight);

        camera.add(pointLight);

        scene.background = new THREE.Color(0xcccccc);
        // scene.background = new THREE.Color().setHSL(0.6, 0, 1);

        camera.add(pointLight);
        scene.add(camera);

        var plane = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(40, 40),
            new THREE.MeshPhongMaterial({ color: 0x999999, specular: 0x101010 })
        );
        plane.rotation.x = - Math.PI / 2;
        
        plane.position.y = - 0.5;
        scene.add(plane);

        plane.receiveShadow = true;


        threeDsLoader.load('/3d_models/Apartment_Building_01_3ds.3DS', (obj) => {
            // obj.traverse(function (child) {
            //     if (child.isMesh) {
            //         child.material.specular.setScalar(0.1);
            //     }
            // });
            obj.applyMatrix4(new THREE.Matrix4().makeRotationX(Math.PI / -2));
            obj.applyMatrix4(new THREE.Matrix4().makeTranslation(0, -0.6, -0.64));
            obj.scale.set(.001, .001, .001)

            console.log(obj)

            scene.add(obj);
        })


        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.outputEncoding = THREE.sRGBEncoding;
        BuildingCanvasContainer.appendChild(renderer.domElement);

        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.screenSpacePanning = false;
        controls.maxPolarAngle = Math.PI / 2;

    }

    function animate() {

        controls.update();
        renderer.render(scene, camera);

        requestAnimationFrame(animate);

    }






    return (
        <div id="BuildingCanvas" />

    )
}



export default BuildingCanvas;