import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const Duck = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        // Set up scene, camera, and renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 3;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        const orbitControls = new OrbitControls(camera, renderer.domElement);

        // Create duck body
        const bodyGeometry = new THREE.SphereGeometry(0.5, 32, 32);
        const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0xffd700 }); // Yellow color for the duck body
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 0.2; // Position body slightly up
        scene.add(body);

        // Create duck head
        const headGeometry = new THREE.SphereGeometry(0.25, 32, 32);
        const headMaterial = new THREE.MeshStandardMaterial({ color: 0xffd700 });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.set(0, 0.5, 0.3); // Position head above the body
        scene.add(head);

        // Create duck beak
        const beakGeometry = new THREE.ConeGeometry(0.1, 0.2, 32);
        const beakMaterial = new THREE.MeshStandardMaterial({ color: 0xffa500 }); // Orange color for the beak
        const beak = new THREE.Mesh(beakGeometry, beakMaterial);
        beak.position.set(0, 0.5, 0.65); // Position beak in front of the head
        beak.rotation.x = Math.PI / 2; // Rotate the beak to face forward
        scene.add(beak);

        // Create duck eyes
        const eyeGeometry = new THREE.SphereGeometry(0.07, 32, 32); // Increase size of the eyes
        const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 }); // Black color for the eyes

        // Left eye
        const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        leftEye.position.set(-0.1, 0.55, 0.35); // Position the left eye
        scene.add(leftEye);

        // Right eye
        const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        rightEye.position.set(0.1, 0.55, 0.35); // Position the right eye
        scene.add(rightEye);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(2, 3, 4);
        scene.add(pointLight);

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            body.rotation.y += 0.01; // Rotate body for some animation
            head.rotation.y += 0.01; // Rotate head for some animation
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
        const description = "This is a 3D model of a duck. Ducks are waterfowl birds known for their distinctive quack sound and webbed feet, which help them swim.";
        const speech = new SpeechSynthesisUtterance(description);
        window.speechSynthesis.speak(speech);
    };

    const handleLearnMore = () => {
        window.open("https://en.wikipedia.org/wiki/Duck", "_blank");
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
        This is a 3 D model of a duck.Ducks are waterfowl that live in both freshwater and saltwater environments. <
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

export default Duck;