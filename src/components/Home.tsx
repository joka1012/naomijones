import "./Home.module.css";
import gsap from "gsap";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/Addons.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import vertexShader from "../shaders/gradient.vert";
import fragmentShader from "../shaders/gradient.frag";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);

    new RGBELoader().load("/studio_small_09_4k.hdr", (hdrTexture) => {
      const envMap = pmremGenerator.fromEquirectangular(hdrTexture).texture;

      scene.environment = envMap;

      hdrTexture.dispose();
      pmremGenerator.dispose();
    });

    camera.position.z = 30;

    const shaderMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
      },
    });

    const distance = camera.position.z - -20;

    const height =
      2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * distance;

    const width = height * camera.aspect;

    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(width, height),
      shaderMaterial,
    );

    plane.position.z = -20;

    scene.add(plane);

    const light = new THREE.DirectionalLight(0xffffff, 4);
    light.position.set(0, 0, 20);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 4);
    scene.add(ambientLight);

    const geometries: TextGeometry[] = [];
    let material: THREE.MeshStandardMaterial | null = null;
    let animationId = 0;
    const floatData: {
      object: THREE.Object3D;
      baseY: number;
      phase: number;
    }[] = [];

    const moveCamera = () => {
      console.log("scroll");
      const t = document.body.getBoundingClientRect().top;

      camera.position.z = 30 + t * -0.02;
      camera.position.x = t * -0.002;
      camera.rotation.y = t * -0.0004;
    };

    const onResize = () => {
      shaderMaterial.uniforms.uResolution.value.set(
        window.innerWidth,
        window.innerHeight,
      );
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const clock = new THREE.Clock();

    function animate() {
      animationId = requestAnimationFrame(animate);

      shaderMaterial.uniforms.uTime.value = clock.getElapsedTime();

      const t = clock.getElapsedTime();

      floatData.forEach(({ object, baseY, phase }) => {
        object.position.y = baseY + Math.sin(t * 1.2 + phase) * 0.3;
        object.rotation.z = Math.sin(t * 0.8 + phase) * 0.02;
        object.rotation.x = Math.sin(t * 0.6 + phase) * 0.01;
      });

      renderer.render(scene, camera);
    }

    async function init() {
      const loader = new FontLoader();

      const font = await loader.loadAsync(
        "/fonts/Dela Gothic One_Regular.json",
      );

      material = new THREE.MeshStandardMaterial({
        color: 0xb5b5b5,
        metalness: 1.0,
        roughness: 0.12,
      });

      function createWord(
        word: string,
        y: number,
        material: THREE.MeshStandardMaterial,
      ) {
        const group = new THREE.Group();
        const letters: THREE.Mesh[] = [];

        let offset = 0;

        for (const char of word) {
          const geometry = new TextGeometry(char, {
            font,
            size: 6,
            depth: 3,
          });

          geometry.computeBoundingBox();

          const width =
            geometry.boundingBox!.max.x - geometry.boundingBox!.min.x;

          const mesh = new THREE.Mesh(geometry, material);

          mesh.position.x = offset;

          offset += width + 0.3;

          const edges = new THREE.EdgesGeometry(geometry);
          const line = new THREE.LineSegments(
            edges,
            new THREE.LineBasicMaterial({ color: 0x000000 }),
          );

          mesh.add(line);

          group.add(mesh);
          letters.push(mesh);
          geometries.push(geometry);
        }

        group.position.set(-offset / 2, y, 0);

        scene.add(group);

        letters.forEach((letter, i) => {
          const angle = Math.random() * Math.PI * 2;
          const radius = 40;

          const startX = Math.cos(angle) * radius;
          const startY = Math.sin(angle) * radius;
          const targetX = letter.position.x;
          const targetY = letter.position.y;

          letter.position.set(targetX + startX, targetY + startY, 0);

          gsap.to(letter.position, {
            x: targetX,
            y: targetY,
            duration: 1.5 + Math.random() * 0.6,
            delay: i * 0.08,
            ease: "back.out(2)",
          });
          gsap.from(letter.rotation, {
            x: Math.PI * 2,
            y: Math.PI * 2,
            duration: 1.5,
          });
        });
        return {
          group,
          letters,
        };
      }

      const naomi = createWord("Naomi", 1, material);
      const jones = createWord("Jones", -6, material);

      floatData.push({
        object: naomi.group,
        baseY: naomi.group.position.y,
        phase: Math.random() * Math.PI * 2,
      });

      floatData.push({
        object: jones.group,
        baseY: jones.group.position.y,
        phase: Math.random() * Math.PI * 2,
      });

      const textGeometry = new TextGeometry(
        "Translation | Coordination | Communication",
        {
          font,
          size: 1,
          depth: 0,
        },
      );

      textGeometry.computeBoundingBox();
      textGeometry.center();

      const textMaterial = new THREE.MeshStandardMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0,
      });

      const text = new THREE.Mesh(textGeometry, textMaterial);

      // Position relativ zur Box
      text.position.set(0, 0, 0.55);

      scene.add(text);

      gsap.to(textMaterial, {
        opacity: 1,
        duration: 2,
        delay: 1,
        ease: "power2.out",
      });

      floatData.push({
        object: text,
        baseY: -10,
        phase: Math.random() * Math.PI * 2,
      });

      moveCamera();
      animate();
    }

    window.addEventListener("scroll", moveCamera);
    window.addEventListener("resize", onResize);

    init();

    return () => {
      cancelAnimationFrame(animationId);

      window.removeEventListener("scroll", moveCamera);
      window.removeEventListener("resize", onResize);

      geometries.forEach((g) => g.dispose());
      material?.dispose();

      renderer.dispose();
    };
  }, []);

  return (
    <>
      <canvas id="bg" ref={canvasRef}></canvas>
    </>
  );
}

export default Home;
