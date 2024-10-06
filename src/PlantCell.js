import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const PlantCell = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        // Set up scene, camera, and renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 2, 5);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        const orbitControls = new OrbitControls(camera, renderer.domElement);
        orbitControls.enableDamping = true;

        // Cell Wall
        const cellWallGeometry = new THREE.BoxGeometry(3, 2, 1);
        const cellWallMaterial = new THREE.MeshStandardMaterial({ color: 0x9acd32, wireframe: false }); // Greenish cell wall
        const cellWall = new THREE.Mesh(cellWallGeometry, cellWallMaterial);
        scene.add(cellWall);

        // Cell Membrane (just slightly smaller than the cell wall)
        const cellMembraneGeometry = new THREE.BoxGeometry(2.9, 1.9, 0.9);
        const cellMembraneMaterial = new THREE.MeshStandardMaterial({ color: 0x90ee90, transparent: true, opacity: 0.7 }); // Light green, transparent
        const cellMembrane = new THREE.Mesh(cellMembraneGeometry, cellMembraneMaterial);
        scene.add(cellMembrane);

        // Nucleus
        const nucleusGeometry = new THREE.SphereGeometry(0.5, 32, 32);
        const nucleusMaterial = new THREE.MeshStandardMaterial({ color: 0x8b0000 }); // Dark red nucleus
        const nucleus = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
        nucleus.position.set(-0.8, 0, 0);
        scene.add(nucleus);

        // Vacuole
        const vacuoleGeometry = new THREE.SphereGeometry(0.7, 32, 32);
        const vacuoleMaterial = new THREE.MeshStandardMaterial({ color: 0x1e90ff, transparent: true, opacity: 0.5 }); // Transparent blue vacuole
        const vacuole = new THREE.Mesh(vacuoleGeometry, vacuoleMaterial);
        vacuole.position.set(0.8, 0, 0);
        scene.add(vacuole);

        // Chloroplasts (represented as green spheres)
        const chloroplastGeometry = new THREE.SphereGeometry(0.2, 16, 16);
        const chloroplastMaterial = new THREE.MeshStandardMaterial({ color: 0x32cd32 }); // Lime green chloroplasts
        const createChloroplast = (x, y, z) => {
            const chloroplast = new THREE.Mesh(chloroplastGeometry, chloroplastMaterial);
            chloroplast.position.set(x, y, z);
            return chloroplast;
        };

        scene.add(createChloroplast(1, 0.6, 0.3));
        scene.add(createChloroplast(-1, -0.6, -0.3));
        scene.add(createChloroplast(0.6, -0.8, 0.5));

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7); // Soft ambient light
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            nucleus.rotation.y += 0.01; // Rotate the nucleus
            vacuole.rotation.y -= 0.01; // Rotate the vacuole
            orbitControls.update();
            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            mountRef.current.removeChild(renderer.domElement);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleReadAloud = () => {
        const description = "This is a 3D model of a plant cell. Plant cells are characterized by having a cell wall, a cell membrane, a large central vacuole, and chloroplasts for photosynthesis.";
        const speech = new SpeechSynthesisUtterance(description);
        window.speechSynthesis.speak(speech);
    };

    const handleLearnMore = () => {
        window.open("https://en.wikipedia.org/wiki/Plant_cell", "_blank");
    };

    return ( <
        div >
        <
        div ref = { mountRef }
        style = {
            { width: "100vw", height: "100vh", position: "relative" } } > < /div> <
        div style = {
            { position: 'absolute', top: '10px', left: '10px', color: 'white' } } >
        <
        p >
        This is a 3 D model of a plant cell.Plant cells are fundamental to life on Earth and play a vital role in photosynthesis. <
        /p> <
        div >
        <
        button onClick = { handleReadAloud }
        style = {
            { marginRight: '10px' } } > Read Aloud < /button> <
        button onClick = { handleLearnMore } > Learn More < /button> <
        /div> <
        /div> <
        /div>
    );
};

export default PlantCell;