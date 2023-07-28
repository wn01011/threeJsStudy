import React, { useEffect, useRef } from "react";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  LineBasicMaterial,
  Vector3,
  BufferGeometry,
  Line,
} from "three";
import WebGL from "three/examples/jsm/capabilities/WebGL";

const FirstQuiz: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current || !WebGL.isWebGLAvailable()) return;

    const scene = new Scene();
    const camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // 정답은 바로 z값이 너무 작아서 입니다.(카메라가 너무 면에 가까워서!)
    camera.position.z = 15;

    const renderer = new WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    mountRef.current.appendChild(renderer.domElement);
    const lineMaterial = new LineBasicMaterial({ color: 0x0000ff });

    const points = [];
    points.push(new Vector3(-10, 0, 0));
    points.push(new Vector3(0, 10, 0));
    points.push(new Vector3(10, 0, 0));
    const blueLineGeometry = new BufferGeometry().setFromPoints(points);
    const blueLine = new Line(blueLineGeometry, lineMaterial);

    scene.add(blueLine);

    renderer.render(scene, camera);
    return () => {
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);
  const str = `
  const scene = new Scene();
  const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  const renderer = new WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  mountRef.current.appendChild(renderer.domElement);
  const lineMaterial = new LineBasicMaterial({ color: 0x0000ff });

  const points = [];
  points.push(new Vector3(-10, 0, 0));
  points.push(new Vector3(0, 10, 0));
  points.push(new Vector3(10, 0, 0));
  const blueLineGeometry = new BufferGeometry().setFromPoints(points);
  const blueLine = new Line(blueLineGeometry, lineMaterial);

  scene.add(blueLine);

  renderer.render(scene, camera);
  return () => {
    mountRef.current?.removeChild(renderer.domElement);
  };
}, []);
  `;

  return (
    <div ref={mountRef}>
      <h1>안녕하세요 문제입니다!</h1>
      <pre>{str}</pre>
      <p>위의 코드를 실행해보면 파란 선이 보이지 않습니다</p>
      <p>보이지 않는 이유에 대해 서술해주세요!</p>
    </div>
  );
};

export default FirstQuiz;
