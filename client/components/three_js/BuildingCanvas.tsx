import React, { useEffect } from 'react'
import * as THREE from "three"
const { PerspectiveCamera, Scene, BoxGeometry, MeshNormalMaterial, Mesh, WebGLRenderer } = THREE

let Camera
let scene
let geometry
let material
let mesh
let renderer


const BuildingCanvas: React.FC = () => {

    function init() {
        Camera.position.z = 1;
        scene.add(mesh);
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
    }

    function animate() {

        requestAnimationFrame(animate);

        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.02;

        renderer.render(scene, Camera);

    }




    useEffect(() => {
        Camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
        scene = new Scene();
        geometry = new BoxGeometry(0.2, 0.2, 0.2);
        material = new MeshNormalMaterial();
        mesh = new Mesh(geometry, material);
        renderer = new WebGLRenderer({ antialias: true });

        init();
        animate();
    }, [])

    return (
        <div id="BuildingCanvas">
            <h1>asd</h1>
        </div>
    )
}



export default BuildingCanvas;