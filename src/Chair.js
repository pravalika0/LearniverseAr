import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const Chair = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        // Set up scene, camera, and renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 1, 3); // Adjust camera position

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        const orbitControls = new OrbitControls(camera, renderer.domElement);
        orbitControls.enableDamping = true; // Smooth controls

        // Load textures
        const textureLoader = new THREE.TextureLoader();
        const woodTexture = textureLoader.load("./textures/chair_wood_texture.jpg", (texture) => {
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(1, 1);
        });

        const seatTexture = textureLoader.load("./textures/chair_seat_texture.jpg", (texture) => {
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(1, 1);
        });

        // Chair geometry and materials
        const chairGroup = new THREE.Group();

        // Chair legs
        const legGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1, 32);
        const legMaterial = new THREE.MeshStandardMaterial({ map: woodTexture });

        const createLeg = (x, z) => {
            const leg = new THREE.Mesh(legGeometry, legMaterial);
            leg.position.set(x, -0.5, z);
            return leg;
        };

        chairGroup.add(createLeg(0.5, 0.5));
        chairGroup.add(createLeg(-0.5, 0.5));
        chairGroup.add(createLeg(0.5, -0.5));
        chairGroup.add(createLeg(-0.5, -0.5));

        // Chair seat
        const seatGeometry = new THREE.BoxGeometry(1.2, 0.1, 1.2);
        const seatMaterial = new THREE.MeshStandardMaterial({ map: seatTexture });
        const seat = new THREE.Mesh(seatGeometry, seatMaterial);
        seat.position.y = 0.05;
        chairGroup.add(seat);

        // Chair backrest
        const backrestGeometry = new THREE.BoxGeometry(1.2, 1, 0.1);
        const backrestMaterial = new THREE.MeshStandardMaterial({ map: seatTexture });
        const backrest = new THREE.Mesh(backrestGeometry, backrestMaterial);
        backrest.position.set(0, 0.55, -0.55);
        chairGroup.add(backrest);

        // Add chair to scene
        scene.add(chairGroup);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Adjusted intensity
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(2, 3, 4);
        scene.add(pointLight);

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            chairGroup.rotation.y += 0.01; // Rotate chair for some animation
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
        const description = "This is a 3D model of a chair. Chairs come in various styles, and this one is a simple wooden chair with a comfortable seat and a solid backrest.";
        const speech = new SpeechSynthesisUtterance(description);
        window.speechSynthesis.speak(speech);
    };

    const handleLearnMore = () => {
        window.open("https://en.wikipedia.org/wiki/Chair", "_blank");
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
        This is a 3 D model of a wooden chair.Chairs are widely used
        for seating and come in various forms, materials, and designs. <
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

export default Chair;