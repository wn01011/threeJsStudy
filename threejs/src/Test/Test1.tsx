import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import * as THREE from "three";

const Test1: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = new THREE.Vector2();
  const previousMouse = new THREE.Vector2();
  const targetRotation = new THREE.Vector2(0, 0);
  const targetRotationOnMouseDown = new THREE.Vector2(0, 0);
  const ACCELERATION = 0.05;

  useEffect(() => {
    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current?.appendChild(renderer.domElement);

    // Cube
    const cubeGeometry = new THREE.BoxGeometry(1, 2, 3);
    const cubeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff00, // Green color
      //   wireframe: true, // Render wireframe
      transparent: true,
      opacity: 0.2,
    });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    scene.add(cube);

    const edges = new THREE.EdgesGeometry(cubeGeometry);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
    });
    const edgesMesh = new THREE.LineSegments(edges, lineMaterial);
    cube.add(edgesMesh);

    // Light
    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);

    // Interaction
    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
      previousMouse.set(e.clientX, e.clientY);
      targetRotationOnMouseDown.copy(targetRotation);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.set(e.clientX, e.clientY);

      const deltaX = mouse.x - previousMouse.x;
      const deltaY = mouse.y - previousMouse.y;

      if (!deltaX && !deltaY) return;

      const isFlipped = Math.abs(cube.rotation.x) > Math.PI / 2;

      const invertedDeltaX = isFlipped ? -deltaX : deltaX;
      targetRotation.x =
        targetRotationOnMouseDown.x + invertedDeltaX * ACCELERATION;
      targetRotation.y = targetRotationOnMouseDown.y + deltaY * ACCELERATION;

      previousMouse.set(mouse.x, mouse.y);
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    containerRef.current?.addEventListener("mousedown", onMouseDown);

    // Animation
    const animate = () => {
      //   // Apply damping
      //   targetRotation.x *= 1 - DAMPING;
      //   targetRotation.y *= 1 - DAMPING;

      // Rotate the cube
      cube.rotation.x += (targetRotation.y - cube.rotation.x) * ACCELERATION;
      cube.rotation.y += (targetRotation.x - cube.rotation.y) * ACCELERATION;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      // Clean up on unmount
      containerRef.current?.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div>
      <Link to={"/"}>홈으로 가기</Link>
      <h1>Test1</h1>
      <div ref={containerRef}></div>
    </div>
  );
};

export default Test1;
