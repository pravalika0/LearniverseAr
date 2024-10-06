import React, { useRef, useEffect } from 'react';
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; // Corrected path
import getStarfield from "./getStarfield.js"; // Adjust path if necessary
import { getFresnelMat } from "./getFresnelMat.js"; // Adjust path if necessary

const Earth = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(w, h);
        mountRef.current.appendChild(renderer.domElement);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

        const earthGroup = new THREE.Group();
        earthGroup.rotation.z = -23.4 * Math.PI / 180;
        scene.add(earthGroup);
        new OrbitControls(camera, renderer.domElement);

        const detail = 12;
        const loader = new THREE.TextureLoader();
        const geometry = new THREE.IcosahedronGeometry(1, detail);
        const material = new THREE.MeshPhongMaterial({
            map: loader.load("./textures/00_earthmap1k.jpg"),
            specularMap: loader.load("./textures/02_earthspec1k.jpg"),
            bumpMap: loader.load("./textures/01_earthbump1k.jpg"),
            bumpScale: 0.04,
        });

        const earthMesh = new THREE.Mesh(geometry, material);
        earthGroup.add(earthMesh);

        const lightsMat = new THREE.MeshBasicMaterial({
            map: loader.load("./textures/03_earthlights1k.jpg"),
            blending: THREE.AdditiveBlending,
        });
        const lightsMesh = new THREE.Mesh(geometry, lightsMat);
        earthGroup.add(lightsMesh);

        const cloudsMat = new THREE.MeshStandardMaterial({
            map: loader.load("./textures/04_earthcloudmap.jpg"),
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            alphaMap: loader.load('./textures/05_earthcloudmaptrans.jpg'),
        });
        const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
        cloudsMesh.scale.setScalar(1.003);
        earthGroup.add(cloudsMesh);

        const fresnelMat = getFresnelMat();
        const glowMesh = new THREE.Mesh(geometry, fresnelMat);
        glowMesh.scale.setScalar(1.01);
        earthGroup.add(glowMesh);

        const stars = getStarfield({ numStars: 2000 });
        scene.add(stars);

        const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
        sunLight.position.set(-2, 0.5, 1.5);
        scene.add(sunLight);

        function animate() {
            requestAnimationFrame(animate);
            earthMesh.rotation.y += 0.002;
            lightsMesh.rotation.y += 0.002;
            cloudsMesh.rotation.y += 0.0023;
            glowMesh.rotation.y += 0.002;
            stars.rotation.y -= 0.0002;
            renderer.render(scene, camera);
        }

        animate();

        function handleWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        window.addEventListener('resize', handleWindowResize, false);

        return () => {
            mountRef.current.removeChild(renderer.domElement);
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    const handleReadAloud = () => {
        const description = "Earth is the third planet from the Sun and the only astronomical object known to harbor life. It has five oceans and seven continents. It is the only planet known to support life, with a diverse range of environments and habitats. Earth's atmosphere is composed of 78% nitrogen, 21% oxygen, and traces of other gases, providing the perfect balance for sustaining life. The planet is covered in approximately 71% water, mainly in the form of oceans, which play a vital role in regulating temperature and weather patterns.While Earth is only the fifth largest planet in the solar system, it is the only world in our solar system with liquid water on the surface. Just slightly larger than nearby Venus, Earth is the biggest of the four planets closest to the Sun, all of which are made of rock and metal.Earth is the only planet in the solar system whose English name does not come from Greek or Roman mythology. The name was taken from Old English and Germanic. It simply means the ground. There are, of course, many names for our planet in the thousands of languages spoken by the people of the third planet from the Sun.";
        const speech = new SpeechSynthesisUtterance(description);
        window.speechSynthesis.speak(speech);
    };

    const handleLearnMore = () => {
        window.open("https://en.wikipedia.org/wiki/Earth", "_blank");
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
        Earth is the third planet from the Sun and the only astronomical object known to harbor life.It has five oceans and seven continents.The planet has a diverse range of environments, supporting a multitude of species. <
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

export default Earth;