'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type Props = { progress: number };

export default function TravelScene({ progress }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(progress);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#dce8ef');
    scene.fog = new THREE.Fog('#dce8ef', 9, 34);

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 3.2, 13);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = false;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambient);
    const sun = new THREE.DirectionalLight(0xffffff, 3.0);
    sun.position.set(5, 10, 5);
    scene.add(sun);

    const world = new THREE.Group();
    world.position.y = -1;
    scene.add(world);

    // Ground and railway tracks.
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(40, 25),
      new THREE.MeshStandardMaterial({ color: '#e2e8f0' })
    );
    ground.rotation.x = -Math.PI / 2;
    world.add(ground);

    const trackMaterial = new THREE.MeshStandardMaterial({ color: '#475569' });
    [-1.4, 1.4].forEach((z) => {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(35, 0.1, 0.16), trackMaterial);
      rail.position.set(0, 0.05, z);
      world.add(rail);
    });

    // Instanced trees: repeated environment elements stay inexpensive.
    const treeCount = 55;
    const tree = new THREE.InstancedMesh(
      new THREE.ConeGeometry(0.7, 2.4, 7),
      new THREE.MeshStandardMaterial({ color: '#475569' }),
      treeCount
    );
    const dummy = new THREE.Object3D();
    for (let i = 0; i < treeCount; i++) {
      const x = (i / treeCount) * 34 - 17;
      const z = i % 2 ? -3.7 + (i % 5) * 0.6 : 3.7 + (i % 5) * 0.6;
      const s = 0.55 + (i % 4) * 0.12;
      dummy.position.set(x, -0.05, z);
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      tree.setMatrixAt(i, dummy.matrix);
    }
    tree.instanceMatrix.needsUpdate = true;
    world.add(tree);

    // Station / destination arch.
    const arch = new THREE.Group();
    const pillarMaterial = new THREE.MeshStandardMaterial({ color: '#ffffff' });
    const topMaterial = new THREE.MeshStandardMaterial({ color: '#cbd5e1' });
    const left = new THREE.Mesh(new THREE.BoxGeometry(0.5, 5, 1), pillarMaterial);
    const right = left.clone();
    right.position.x = 4;
    const top = new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.35, 1), topMaterial);
    top.position.set(2, 2.55, 0);
    arch.add(left, right, top);
    arch.position.set(15, 0, -1);
    world.add(arch);

    // Stylized luxury train.
    const train = new THREE.Group();
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(4.8, 1, 1.3),
      new THREE.MeshStandardMaterial({ color: '#f8fafc' })
    );
    train.add(body);

    const front = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 1.25, 1.3),
      new THREE.MeshStandardMaterial({ color: '#cbd5e1' })
    );
    front.position.set(2.35, 0.15, 0);
    train.add(front);

    const windowMaterial = new THREE.MeshStandardMaterial({ color: '#334155' });
    [-1.5, -0.3, 0.9, 2].forEach((x) => {
      const window = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.38, 0.03), windowMaterial);
      window.position.set(x, 0.15, 0.66);
      train.add(window);
    });

    const wheelMaterial = new THREE.MeshStandardMaterial({ color: '#0f172a' });
    [-1.7, 1.7].forEach((x) => {
      const wheel = new THREE.Mesh(
        new THREE.CylinderGeometry(0.28, 0.28, 0.18, 16),
        wheelMaterial
      );
      wheel.position.set(x, -0.65, 0.48);
      wheel.rotation.x = Math.PI / 2;
      train.add(wheel);
    });

    train.position.set(-8, 0.9, 0);
    scene.add(train);

    // Floating destination marker.
    const marker = new THREE.Mesh(
      new THREE.TorusGeometry(1.2, 0.12, 12, 40),
      new THREE.MeshStandardMaterial({ color: '#c9a35b' })
    );
    marker.position.set(11, 1.8, -2);
    scene.add(marker);

    const resize = () => {
      const width = mount.clientWidth || window.innerWidth;
      const height = mount.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    resize();
    window.addEventListener('resize', resize);

    let raf = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const p = Math.max(0, Math.min(1, progressRef.current));
      const trainP = Math.max(0, Math.min(1, (p - 0.12) / 0.5));
      const destination = p > 0.6;

      // Scroll controls the cinematic journey; the animation loop does not set React state.
      train.position.x = THREE.MathUtils.lerp(-8, 7, trainP);
      train.position.y = 0.9 + Math.sin(elapsed * 2) * 0.025;
      train.rotation.y = THREE.MathUtils.lerp(0.18, -0.05, trainP);

      marker.position.x = destination ? 4 : 11;
      marker.rotation.y = elapsed * 0.35;
      marker.position.y = 1.8 + Math.sin(elapsed * 1.2) * 0.12;

      arch.position.x = destination ? 8 : 15;
      world.position.x = THREE.MathUtils.lerp(0, -p * 5, 0.08);

      const sky = new THREE.Color(destination ? '#f4e7d3' : '#dce8ef');
      scene.background = sky;
      (scene.fog as THREE.Fog).color.copy(sky);

      camera.position.x = Math.sin(p * Math.PI) * 1.1;
      camera.position.y = 3.2 + Math.sin(p * Math.PI) * 0.35;
      camera.lookAt(0, 0.5, 0);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
      scene.traverse((object) => {
        const mesh = object as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) {
          const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          materials.forEach((material) => material.dispose());
        }
      });
    };
  }, []);

  return <div ref={mountRef} aria-label="7PAX 3D travel journey" style={{ width: '100%', height: '100%' }} />;
}
