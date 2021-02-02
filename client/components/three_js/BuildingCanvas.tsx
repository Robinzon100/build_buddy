import React, { useEffect } from 'react'
import * as THREE from "three"
const { PerspectiveCamera, Scene, WebGLRenderer } = THREE
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { fragment } from './shaders/fragmentShader';
import { vertex } from './shaders/vertexShader';
import gsap from "gsap";



const BuildingCanvas: React.FC = () => {


    let uniforms = {
        time: { type: "f", value: 1.0 },
        image: { type: 't', value: new THREE.TextureLoader().load('/video.mp4') },
        resolution: { type: "v4", value: new THREE.Vector4() }
    };
    let material = new THREE.ShaderMaterial({
        side: THREE.DoubleSide,
        uniforms: uniforms,
        transparent: true,
        vertexShader: vertex(),
        fragmentShader: fragment()
    });

    useEffect(() => {
        init();
    }, [])




    function init() {
        const axesHelper = new THREE.AxesHelper(5);
        const video = document.querySelector('video')
        const clock = new THREE.Clock()

        let mousePosition = {
            x: 0,
            y: 0
        }

        window.addEventListener('mousemove', (e) => {
            // mousePosition.x = e.clientX / window.innerWidth - 0.5
            // mousePosition.y = - (e.clientY / window.innerHeight - 0.5)

        })

        // ─── CAMERA ──────────────────────────────────────────────────────
        const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);
        camera.position.set(0, 0, 2)

        // ─── RENDERER ────────────────────────────────────────────────────
        const renderer = new WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.outputEncoding = THREE.sRGBEncoding;


        // ─── VIDEO TEXTURE ───────────────────────────────────────────────
        const videoTexture = new THREE.VideoTexture(video) 
        const videoMaterial = new THREE.MeshBasicMaterial({
            map: videoTexture,
            side: THREE.FrontSide,
            toneMapped: true
        })

        // ─── PLANE ───────────────────────────────────────────────────────
        const cube = new THREE.Mesh(new THREE.SphereGeometry(3, 74, 74), material);


        // ─── CONTROLS ────────────────────────────────────────────────────
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.screenSpacePanning = false;

        // gsap.to(cube.position, { duration: 1, delay: 1, x: 2 })


        function animate() {
            // camera.position.x = Math.sin(mousePosition.x * Math.PI * 2)  * 3
            // camera.position.z = Math.cos(mousePosition.x * Math.PI * 2) * 3
            // camera.position.y = mousePosition.y * 5
            // camera.lookAt(cube.position)
            controls.update()
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }


        // ─── ADDING SCENES ───────────────────────────────────────────────
        const scene = new Scene();
        scene.add(axesHelper);
        scene.add(camera);
        scene.background = new THREE.Color(0xcccccc);
        scene.add(cube);

        document.querySelector('#BuildingCanvas').appendChild(renderer.domElement);
        animate()
    }






    return (
        <>
            <video muted autoPlay src="/video.mp4"></video>
            <div id="BuildingCanvas" />
        </>
    )
}



export default BuildingCanvas;