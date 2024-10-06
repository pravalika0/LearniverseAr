import React, { useRef, useEffect } from 'react';
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const Apple = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const w = window.innerWidth;
        const h = window.innerHeight;

        // Create scene, camera, and renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
        camera.position.z = 3;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(w, h);
        mountRef.current.appendChild(renderer.domElement);

        // Add lighting to the scene
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        // Create apple geometry (simple sphere)
        const appleGeometry = new THREE.SphereGeometry(1, 32, 32);
        const appleMaterial = new THREE.MeshPhongMaterial({
            color: 0xff0000, // Red color for the apple
            shininess: 50,
        });

        const appleMesh = new THREE.Mesh(appleGeometry, appleMaterial);
        scene.add(appleMesh);

        // Create apple stem
        const stemGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.5, 32);
        const stemMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 }); // Brown color for stem

        const stemMesh = new THREE.Mesh(stemGeometry, stemMaterial);
        stemMesh.position.y = 1.25;
        scene.add(stemMesh);

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);

        // Animate scene
        const animate = () => {
            requestAnimationFrame(animate);
            appleMesh.rotation.y += 0.01;
            renderer.render(scene, camera);
        };

        animate();

        // Handle window resize
        const handleResize = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            renderer.setSize(w, h);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', handleResize);

        // Clean up
        return () => {
            window.removeEventListener('resize', handleResize);
            mountRef.current.removeChild(renderer.domElement);
        };
    }, []);

    const handleReadAloud = () => {
        const description = "This is a red apple, commonly known for its sweet and crisp taste. Apples are one of the most popular fruits worldwide.";
        const speech = new SpeechSynthesisUtterance(description);
        window.speechSynthesis.speak(speech);
    };

    const handleLearnMore = () => {
        window.open("https://en.wikipedia.org/wiki/Apple", "_blank");
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
        This is a red apple, commonly known
        for its sweet and crisp taste.Apples are one of the most popular fruits worldwide. <
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

export default Apple;