import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const Planee = () => {
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

        // Airplane body
        const bodyGeometry = new THREE.CylinderGeometry(0.3, 0.3, 3, 32);
        const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x8b8b8b }); // Grayish metal color
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.rotation.z = Math.PI / 2; // Rotate the body
        scene.add(body);

        // Airplane wings
        const wingGeometry = new THREE.BoxGeometry(2, 0.1, 0.8);
        const wingMaterial = new THREE.MeshStandardMaterial({ color: 0x303F9F }); // Blue wings
        const wing = new THREE.Mesh(wingGeometry, wingMaterial);
        wing.position.set(0, 0, 0.5);
        body.add(wing);

        // Airplane tail
        const tailGeometry = new THREE.BoxGeometry(0.6, 0.1, 0.5);
        const tailMaterial = new THREE.MeshStandardMaterial({ color: 0x8b8b8b });
        const tail = new THREE.Mesh(tailGeometry, tailMaterial);
        tail.position.set(-1.5, 0, 0.2);
        body.add(tail);

        // Airplane vertical stabilizer (rudder)
        const rudderGeometry = new THREE.BoxGeometry(0.1, 0.5, 0.3);
        const rudderMaterial = new THREE.MeshStandardMaterial({ color: 0x303F9F });
        const rudder = new THREE.Mesh(rudderGeometry, rudderMaterial);
        rudder.position.set(-1.5, 0.3, 0.2);
        body.add(rudder);

        // Airplane cockpit (front)
        const cockpitGeometry = new THREE.SphereGeometry(0.3, 32, 32);
        const cockpitMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF }); // White cockpit
        const cockpit = new THREE.Mesh(cockpitGeometry, cockpitMaterial);
        cockpit.position.set(1.6, 0, 0);
        body.add(cockpit);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            body.rotation.y += 0.01; // Rotate the airplane slowly
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
        const description = "This is a 3D model of an airplane. Airplanes are designed to fly through the air, carrying passengers or cargo across vast distances.";
        const speech = new SpeechSynthesisUtterance(description);
        window.speechSynthesis.speak(speech);
    };

    const handleLearnMore = () => {
        window.open("https://en.wikipedia.org/wiki/Airplane", "_blank");
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
        This is a 3 D model of an airplane.Airplanes are vehicles capable of flight, widely used
        for transportation. <
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

export default Planee;