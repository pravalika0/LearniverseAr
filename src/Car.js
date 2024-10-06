import React, { useRef, useEffect, useState } from 'react';
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const Car = () => {
    const mountRef = useRef(null);
    const [isSpeaking, setIsSpeaking] = useState(false);

    useEffect(() => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
        camera.position.set(0, 1.5, 4); // Adjusted for better view of the car

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(w, h);
        mountRef.current.appendChild(renderer.domElement);

        const loader = new GLTFLoader();
        let carModel;

        loader.load("/path/to/bmw.glb", (gltf) => {
            carModel = gltf.scene;
            carModel.scale.set(0.01, 0.01, 0.01); // Scale the model
            carModel.position.set(0, -0.5, 0); // Adjust car position
            scene.add(carModel);
        });

        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(10, 10, 10);
        scene.add(light);
        scene.add(new THREE.AmbientLight(0x404040)); // Ambient light

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableZoom = true;
        controls.enablePan = true;
        controls.enableRotate = true;

        const animate = () => {
            requestAnimationFrame(animate);
            if (carModel) carModel.rotation.y += 0.01; // Rotate the car
            renderer.render(scene, camera);
        };

        animate();

        const handleWindowResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            mountRef.current.removeChild(renderer.domElement);
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    const handleReadAloud = () => {
        if (!isSpeaking) {
            setIsSpeaking(true);
            const description = "This is a BMW, a German luxury vehicle renowned for its performance, engineering, and innovative design.";
            const speech = new SpeechSynthesisUtterance(description);
            speech.onend = () => setIsSpeaking(false);
            window.speechSynthesis.speak(speech);
        } else {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    };

    const handleLearnMore = () => {
        window.open("https://www.bmw.com", "_blank"); // Link to BMW website or more information
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
        This is a BMW, a German luxury vehicle renowned
        for its performance, engineering, and innovative design. <
        /p> <
        div >
        <
        button onClick = { handleReadAloud }
        style = {
            { marginRight: '10px' }
        } > { isSpeaking ? "Stop Reading" : "Read Aloud" } <
        /button> <
        button onClick = { handleLearnMore } > Learn More < /button> < /
        div > <
        /div> < /
        div >
    );
};

export default Car;