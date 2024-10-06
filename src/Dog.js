import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const Dog = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        // Set up scene, camera, and renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 1, 5); // Adjust camera position

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        const orbitControls = new OrbitControls(camera, renderer.domElement);
        orbitControls.enableDamping = true; // Smooth controls

        // Create a basic brown dog shape using geometries
        const bodyGeometry = new THREE.BoxGeometry(2, 1, 1);
        const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 }); // Brown color
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.set(0, 0.5, 0);
        scene.add(body);

        // Create the head
        const headGeometry = new THREE.SphereGeometry(0.6, 32, 32);
        const headMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.set(0, 1.2, 0);
        scene.add(head);

        // Create the legs
        const legGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1, 32);
        const legMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });

        const createLeg = (x, z) => {
            const leg = new THREE.Mesh(legGeometry, legMaterial);
            leg.position.set(x, 0, z);
            return leg;
        };

        body.add(createLeg(0.8, -0.5)); // Front right leg
        body.add(createLeg(-0.8, -0.5)); // Front left leg
        body.add(createLeg(0.8, 0.5)); // Back right leg
        body.add(createLeg(-0.8, 0.5)); // Back left leg

        // Create the tail
        const tailGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 32);
        const tailMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
        const tail = new THREE.Mesh(tailGeometry, tailMaterial);
        tail.position.set(-1.5, 0.5, 0);
        tail.rotation.z = Math.PI / 4; // Tilt the tail
        body.add(tail);

        // Create the eyes
        const eyeGeometry = new THREE.SphereGeometry(0.1, 32, 32);
        const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff }); // White eyes
        const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        leftEye.position.set(-0.2, 1.3, 0.4);
        const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        rightEye.position.set(0.2, 1.3, 0.4);
        head.add(leftEye);
        head.add(rightEye);

        // Create pupils
        const pupilGeometry = new THREE.SphereGeometry(0.05, 32, 32);
        const pupilMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 }); // Black pupils
        const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
        leftPupil.position.set(-0.2, 1.3, 0.5);
        const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
        rightPupil.position.set(0.2, 1.3, 0.5);
        head.add(leftPupil);
        head.add(rightPupil);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Adjusted intensity
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            body.rotation.y += 0.01; // Rotate the body for some animation
            orbitControls.update(); // Update controls
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
        const description = "This is a 3D model of a brown dog. Dogs are domesticated mammals that are often known for their loyalty and companionship.";
        const speech = new SpeechSynthesisUtterance(description);
        window.speechSynthesis.speak(speech);
    };

    const handleLearnMore = () => {
        window.open("https://en.wikipedia.org/wiki/Dog", "_blank");
    };

    return ( <
        div >
        <
        div ref = { mountRef }
        style = {
            { width: "100vw", height: "100vh", position: "relative" }
        } > < /div> <
        div style = {
            { position: 'absolute', top: '10px', left: '10px', color: 'white' }
        } >
        <
        p >
        This is a 3 D model of a brown dog.Dogs are known
        for their loyalty and companionship. <
        /p> <
        div >
        <
        button onClick = { handleReadAloud }
        style = {
            { marginRight: '10px' }
        } > Read Aloud < /button> <
        button onClick = { handleLearnMore } > Learn More < /button> < /
        div > <
        /div> < /
        div >
    );
};

export default Dog;