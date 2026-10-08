'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function GlobalJourneyScene() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);
  const heroScrollRef = useRef(0);

  useEffect(() => {
    const mount = ref.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#82d9ff');
    scene.fog = new THREE.Fog('#b7e5f3', 30, 135);

    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 180);
    camera.position.set(0, 4.8, 21);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight('#d9f7ff', '#2e5b36', 3.6));
    const sun = new THREE.DirectionalLight('#fff4cf', 5.2);
    sun.position.set(16, 22, 12);
    scene.add(sun);
    const warm = new THREE.PointLight('#ffd47b', 12, 55, 2);
    warm.position.set(0, 6, 5);
    scene.add(warm);

    const world = new THREE.Group();
    scene.add(world);

    // Ground + track bed.
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(180, 130),
      new THREE.MeshStandardMaterial({ color: '#4d8a42', roughness: 1 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.75;
    world.add(ground);

    const ballast = new THREE.Mesh(
      new THREE.PlaneGeometry(150, 10),
      new THREE.MeshStandardMaterial({ color: '#263442', roughness: 1 })
    );
    ballast.rotation.x = -Math.PI / 2;
    ballast.position.y = -1.53;
    world.add(ballast);

    // Futuristic railway terminal platform: architectural silhouettes make the hero feel like a virtual station, not a floating toy scene.
    const stationMat = new THREE.MeshStandardMaterial({ color: '#d5d9d4', metalness: 0.25, roughness: 0.6 });
    const glassMat = new THREE.MeshPhysicalMaterial({ color: '#b8f0ff', transmission: 0.35, transparent: true, opacity: 0.22, metalness: 0.1, roughness: 0.1 });
    const platform = new THREE.Mesh(new THREE.BoxGeometry(150, .55, 7.5), stationMat);
    platform.position.set(0, -1.05, -7.0); world.add(platform);
    const platformEdge = new THREE.Mesh(new THREE.BoxGeometry(150, .12, .18), new THREE.MeshStandardMaterial({color:'#52e7ff', emissive:'#24cfff', emissiveIntensity:3, metalness:.35, roughness:.2}));
    platformEdge.position.set(0, -.74, -3.35); world.add(platformEdge);
    const canopy = new THREE.Mesh(new THREE.BoxGeometry(150, .3, 11), stationMat);
    canopy.position.set(0, 6.6, -8.8); world.add(canopy);
    const canopyGlow = new THREE.Mesh(new THREE.BoxGeometry(150, .08, 9.8), new THREE.MeshBasicMaterial({color:'#f7fbef',transparent:true,opacity:.75}));
    canopyGlow.position.set(0, 6.4, -8.8); world.add(canopyGlow);
    for(let x=-68;x<=68;x+=8){
      const column=new THREE.Mesh(new THREE.BoxGeometry(.18,7.6,.18),stationMat); column.position.set(x,2.55,-10.8); world.add(column);
      const light=new THREE.Mesh(new THREE.BoxGeometry(2.2,.08,.16),new THREE.MeshBasicMaterial({color:'#fff4bd',transparent:true,opacity:.8})); light.position.set(x,6.15,-8.8); world.add(light);
    }

    // Human-scale station details: benches, signs, luggage and a small waiting crowd.
    const benchMat = new THREE.MeshStandardMaterial({ color: '#6c4b35', roughness: .8 });
    const benchMetal = new THREE.MeshStandardMaterial({ color: '#68736c', metalness: .65, roughness: .35 });
    for(let x=-28;x<=28;x+=14){
      const bench=new THREE.Group();
      const seat=new THREE.Mesh(new THREE.BoxGeometry(3.2,.18,.55),benchMat); seat.position.y=.35; bench.add(seat);
      const back=new THREE.Mesh(new THREE.BoxGeometry(3.2,.8,.12),benchMat); back.position.set(0,.78,-.22); bench.add(back);
      [-1.15,1.15].forEach(px=>{const leg=new THREE.Mesh(new THREE.BoxGeometry(.12,.7,.12),benchMetal);leg.position.set(px,.02,0);bench.add(leg)});
      bench.position.set(x,-.65,-5.7); world.add(bench);
    }
    const signBoard=new THREE.Group();
    const signPanel=new THREE.Mesh(new THREE.BoxGeometry(5.4,1.35,.16),new THREE.MeshStandardMaterial({color:'#214c31',roughness:.5}));
    signPanel.position.y=3.3; signBoard.add(signPanel);
    [-2.25,2.25].forEach(px=>{const post=new THREE.Mesh(new THREE.CylinderGeometry(.06,.08,3.3,8),benchMetal);post.position.set(px,1.6,0);signBoard.add(post)});
    signBoard.position.set(8,-.6,-8.8); world.add(signBoard);

    const stationPeople: THREE.Group[]=[];
    const personColors=['#315d8b','#b84d4d','#d18a34','#4f7f55','#7b5b9d','#284b63'];
    function addStationPerson(x:number,z:number,scale:number,index:number){
      const g=new THREE.Group();
      const body=new THREE.Mesh(new THREE.CapsuleGeometry(.12,.38,4,8),new THREE.MeshStandardMaterial({color:personColors[index%personColors.length],roughness:.9}));
      body.position.y=.18; g.add(body);
      const head=new THREE.Mesh(new THREE.SphereGeometry(.13,12,12),new THREE.MeshStandardMaterial({color:index%2?'#9a6246':'#b87552',roughness:.9}));
      head.position.y=.64; g.add(head);
      const bag=new THREE.Mesh(new THREE.BoxGeometry(.2,.32,.12),new THREE.MeshStandardMaterial({color:'#3d3028',roughness:1})); bag.position.set(.24,.12,.12); g.add(bag);
      g.position.set(x,-.55,z); g.scale.setScalar(scale); world.add(g); stationPeople.push(g);
    }
    for(let i=0;i<14;i++) addStationPerson(-30+(i*4.6)%60,-5.1-(i%3)*.65,.92,i);
    // Floating destination portal.
    const portalGroup=new THREE.Group();
    const portal=new THREE.Mesh(new THREE.TorusGeometry(5.4,.16,16,96),new THREE.MeshStandardMaterial({color:'#d7ffad',emissive:'#8fe86d',emissiveIntensity:4,metalness:.4,roughness:.15}));
    portalGroup.add(portal);
    const portalInner=new THREE.Mesh(new THREE.TorusGeometry(4.35,.07,12,96),new THREE.MeshStandardMaterial({color:'#ffd98b',emissive:'#ff9f45',emissiveIntensity:3.5,metalness:.2,roughness:.12}));
    portalInner.rotation.x=.25; portalGroup.add(portalInner);
    portalGroup.position.set(-13,6,-28); portalGroup.rotation.y=-.22; world.add(portalGroup);

    // Holographic route beacon and floating rings.
    const beacon=new THREE.Group();
    const beaconCore=new THREE.Mesh(new THREE.OctahedronGeometry(1.15,2),new THREE.MeshStandardMaterial({color:'#e5ff9c',emissive:'#a8ef5e',emissiveIntensity:4,transparent:true,opacity:.82}));
    beacon.add(beaconCore);
    const ringA=new THREE.Mesh(new THREE.TorusGeometry(2.2,.045,8,80),new THREE.MeshBasicMaterial({color:'#d7f58a',transparent:true,opacity:.8})); ringA.rotation.x=Math.PI/2; beacon.add(ringA);
    const ringB=ringA.clone(); ringB.rotation.x=.35; ringB.rotation.y=.8; beacon.add(ringB);
    beacon.position.set(21,4,-15); world.add(beacon);

    const railMat = new THREE.MeshStandardMaterial({ color: '#b8c3cc', metalness: 0.95, roughness: 0.18 });
    [-2.15, 2.15].forEach(z => {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(150, 0.13, 0.14), railMat);
      rail.position.set(0, -1.34, z);
      world.add(rail);
    });
    const sleeperMat = new THREE.MeshStandardMaterial({ color: '#263f45', roughness: 0.95 });
    for (let x = -75; x <= 75; x += 1.1) {
      const sleeper = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.16, 6.1), sleeperMat);
      sleeper.position.set(x, -1.47, 0);
      world.add(sleeper);
    }

    // A second, lower foreground track is reserved for a small commuter train.
    // It loops continuously during the hero so the opening scene always feels alive.
    const foregroundRailMat = new THREE.MeshStandardMaterial({ color: '#8f9aa2', metalness: 0.9, roughness: 0.25 });
    [-1.15, 1.15].forEach(z => {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(180, 0.10, 0.11), foregroundRailMat);
      rail.position.set(0, -1.18, z + 4.6);
      world.add(rail);
    });
    for (let x = -90; x <= 90; x += 1.15) {
      const sleeper = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.12, 4.0), sleeperMat);
      sleeper.position.set(x, -1.30, 4.6);
      world.add(sleeper);
    }

    // Distant layered mountains: broad silhouettes feel more like a real horizon than repeated cones.
    const mountainColors=['#3b6f55','#2d624d','#235441','#1a493a'];
    function addRidge(z:number,scale:number,color:string,offset:number){
      const pts:THREE.Vector2[]=[];
      for(let i=0;i<=18;i++){
        const x=-80+i*(160/18);
        const wave=Math.sin(i*.72+offset)*5 + Math.sin(i*1.57+offset*.7)*2.5;
        pts.push(new THREE.Vector2(x,Math.max(2,wave+9)*scale));
      }
      const shape=new THREE.Shape();
      shape.moveTo(-80,0);
      pts.forEach((pt,i)=> i===0 ? shape.lineTo(pt.x,pt.y) : shape.lineTo(pt.x,pt.y));
      shape.lineTo(80,0); shape.closePath();
      const mesh=new THREE.Mesh(new THREE.ShapeGeometry(shape),new THREE.MeshStandardMaterial({color,roughness:1}));
      mesh.position.set(0,-1.5,z); world.add(mesh);
    }
    addRidge(-42,.72,mountainColors[0],.2);
    addRidge(-36,.9,mountainColors[1],1.2);
    addRidge(-31,1.05,mountainColors[2],2.1);
    addRidge(-27,1.18,mountainColors[3],3.1);

    // Dense, varied greenery: three natural shades and mixed tree shapes avoid a repeated/AI-looking forest.
    const trunkGeo = new THREE.CylinderGeometry(0.11, 0.17, 1.55, 7);
    const trunkMat = new THREE.MeshStandardMaterial({ color: '#5b3d2b', roughness: 1 });
    const trunks = new THREE.InstancedMesh(trunkGeo, trunkMat, 150);

    const treeGeos = [
      new THREE.ConeGeometry(0.85, 3.2, 9),
      new THREE.SphereGeometry(1.05, 10, 8),
      new THREE.ConeGeometry(1.15, 3.7, 10)
    ];
    const treeMats = [
      new THREE.MeshStandardMaterial({ color: '#17643f', roughness: 0.95 }),
      new THREE.MeshStandardMaterial({ color: '#2e8b55', roughness: 0.95 }),
      new THREE.MeshStandardMaterial({ color: '#0e4a38', roughness: 0.95 })
    ];
    const crowns = treeGeos.map((geo, index) => new THREE.InstancedMesh(geo, treeMats[index], 50));
    const dummy = new THREE.Object3D();

    // Deterministic placement keeps the landscape stable between renders.
    for (let i = 0; i < 150; i++) {
      const x = -74 + ((i * 37) % 148);
      const side = i % 2 ? 1 : -1;
      const z = side * (6.5 + ((i * 19) % 75) / 10);
      const s = 0.62 + ((i * 17) % 70) / 100;
      const type = i % 3;

      dummy.position.set(x, -0.55, z);
      dummy.scale.set(s, s, s);
      dummy.rotation.y = (i * 0.73) % (Math.PI * 2);
      dummy.updateMatrix();
      trunks.setMatrixAt(i, dummy.matrix);

      dummy.position.y = 1.05 * s - 0.55;
      dummy.scale.set(s, s, s);
      dummy.rotation.y = (i * 0.73) % (Math.PI * 2);
      dummy.updateMatrix();
      crowns[type].setMatrixAt(Math.floor(i / 3), dummy.matrix);
    }
    trunks.instanceMatrix.needsUpdate = true;
    crowns.forEach(c => { c.instanceMatrix.needsUpdate = true; world.add(c); });
    world.add(trunks);

    // Foreground shrubs and small wildflower patches add depth and remove the synthetic empty-space look.
    const shrubMats=['#2f7f3e','#4e9c45','#1f6a36'].map(c=>new THREE.MeshStandardMaterial({color:c,roughness:1}));
    for(let i=0;i<90;i++){
      const shrub=new THREE.Mesh(new THREE.SphereGeometry(.45+((i*7)%5)*.08,8,6),shrubMats[i%3]);
      const side=i%2?1:-1; shrub.position.set(-72+((i*23)%144),-.7,side*(3.4+((i*11)%22)/10)); shrub.scale.y=.65; world.add(shrub);
    }

    // Trackside lamps and signals.
    const lampMat = new THREE.MeshStandardMaterial({ color: '#1b2229', metalness: 0.8, roughness: 0.25 });
    const lampGlow = new THREE.MeshStandardMaterial({ color: '#ffd56a', emissive: '#ff8b1f', emissiveIntensity: 5 });
    for (let x = -70; x <= 70; x += 7) {
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.07, 3.2, 8), lampMat);
      pole.position.set(x, 0, -5.8);
      world.add(pole);
      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 12), lampGlow);
      bulb.position.set(x, 1.65, -5.8);
      world.add(bulb);
    }

    // Realistic modern intercity train — large, detailed, metallic, with passengers visible through windows.
    const train = new THREE.Group();
    const silver = new THREE.MeshStandardMaterial({ color: '#dce4ea', metalness: 0.72, roughness: 0.22 });
    const darkSilver = new THREE.MeshStandardMaterial({ color: '#4d5a66', metalness: 0.82, roughness: 0.24 });
    const navy = new THREE.MeshStandardMaterial({ color: '#071d36', metalness: 0.5, roughness: 0.2 });
    const blue = new THREE.MeshStandardMaterial({ color: '#1476a8', metalness: 0.55, roughness: 0.2 });
    const orange = new THREE.MeshStandardMaterial({ color: '#f28c28', metalness: 0.55, roughness: 0.22 });
    const glass = new THREE.MeshPhysicalMaterial({ color: '#071a2c', metalness: 0.1, roughness: 0.08, transmission: 0.18, transparent: true, opacity: 0.9 });
    const interior = new THREE.MeshStandardMaterial({ color: '#182b3c', roughness: 0.8 });
    const skin = new THREE.MeshStandardMaterial({ color: '#b97852', roughness: 0.9 });
    const clothing = new THREE.MeshStandardMaterial({ color: '#2c5874', roughness: 0.85 });

    const wheels: THREE.Mesh[] = [];
    const people: THREE.Group[] = [];
    const windowLights: THREE.Mesh[] = [];
    const coachGroups: THREE.Group[] = [];

    function addPerson(car: THREE.Group, x: number, z: number, scale = 1) {
      const person = new THREE.Group();
      const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.13, 0.34, 4, 8), clothing);
      torso.position.y = -0.12;
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.13, 12, 12), skin);
      head.position.y = 0.18;
      person.add(torso, head);
      person.position.set(x, 0.1, z);
      person.scale.setScalar(0.95);
      car.add(person);
      people.push(person);
    }

    function addCoach(x: number, accent: THREE.Material, passengerOffset: number) {
      const car = new THREE.Group();
      coachGroups.push(car);
      const body = new THREE.Mesh(new THREE.BoxGeometry(10.4, 3.05, 3.55), silver);
      body.position.y = 0.25;
      car.add(body);

      // Curved roof and lower skirt make it read like a real passenger coach rather than a toy box.
      const roof = new THREE.Mesh(new THREE.CylinderGeometry(1.78, 1.78, 10.45, 32, 1, false, 0, Math.PI), silver);
      roof.rotation.z = Math.PI / 2;
      roof.position.y = 1.78;
      car.add(roof);
      const skirt = new THREE.Mesh(new THREE.BoxGeometry(10.5, 0.48, 3.65), darkSilver);
      skirt.position.y = -1.22;
      car.add(skirt);

      const belt = new THREE.Mesh(new THREE.BoxGeometry(10.5, 0.3, 3.61), accent);
      belt.position.y = 0.25;
      car.add(belt);
      const lower = new THREE.Mesh(new THREE.BoxGeometry(10.5, 0.13, 3.62), orange);
      lower.position.y = -0.62;
      car.add(lower);

      // Large tinted windows with warm interior lighting and visible passengers.
      for (let wx = -4.2; wx <= 4.2; wx += 1.4) {
        const win = new THREE.Mesh(new THREE.BoxGeometry(1.05, 1.02, 0.055), glass);
        win.position.set(wx, 0.82, 1.79);
        car.add(win);
        const glow = new THREE.Mesh(new THREE.BoxGeometry(0.96, 0.91, 0.035), new THREE.MeshBasicMaterial({ color: '#ffd99a', transparent: true, opacity: 0.13 }));
        glow.position.set(wx, 0.82, 1.755);
        car.add(glow);
        windowLights.push(glow);
        addPerson(car, wx - 0.18, 1.72, 1.15);
        addPerson(car, wx + 0.23, 1.72, 0.86);
      }

      // Door seams and door windows.
      [-4.85, 4.85].forEach(dx => {
        const door = new THREE.Mesh(new THREE.BoxGeometry(0.07, 2.45, 3.57), darkSilver);
        door.position.set(dx, 0.18, 0);
        car.add(door);
      });

      // Bogies and wheels.
      [-3.55, 3.55].forEach(wx => {
        const bogie = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.35, 2.4), darkSilver);
        bogie.position.set(wx, -1.55, 0);
        car.add(bogie);
        [-0.72, 0.72].forEach(wz => {
          const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.53, 0.53, 0.24, 24), navy);
          wheel.rotation.x = Math.PI / 2;
          wheel.position.set(wx, -1.72, wz);
          car.add(wheel);
          wheels.push(wheel);
        });
      });

      // Roof HVAC units and safety details add scale and realism.
      for (let rx = -3.1; rx <= 3.1; rx += 2.1) {
        const hvac = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.22, 1.05), darkSilver);
        hvac.position.set(rx, 1.95, 0);
        car.add(hvac);
      }
      const sideStripe = new THREE.Mesh(new THREE.BoxGeometry(9.6, 0.045, 0.035), new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.6 }));
      sideStripe.position.set(0, 0.58, 1.82);
      car.add(sideStripe);

      // Coupler.
      const coupler = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.3, 0.5), darkSilver);
      coupler.position.set(5.38, -0.72, 0);
      car.add(coupler);
      car.position.x = x;
      train.add(car);
    }

    // Three full-size coaches.
    addCoach(-1.5, blue, 0);
    addCoach(-12.1, blue, 0);
    addCoach(-22.7, orange, 0);

    // Streamlined locomotive nose at the front.
    const loco = new THREE.Group();
    const noseBody = new THREE.Mesh(new THREE.BoxGeometry(5.5, 3.65, 3.7), silver);
    noseBody.position.y = 0.3;
    loco.add(noseBody);
    const noseTop = new THREE.Mesh(new THREE.CylinderGeometry(1.83, 1.83, 5.55, 32, 1, false, 0, Math.PI), silver);
    noseTop.rotation.z = Math.PI / 2;
    noseTop.position.y = 1.92;
    loco.add(noseTop);
    const noseBlue = new THREE.Mesh(new THREE.BoxGeometry(5.58, 0.42, 3.75), blue);
    noseBlue.position.y = 0.38;
    loco.add(noseBlue);
    const windshield = new THREE.Mesh(new THREE.BoxGeometry(2.35, 0.82, 0.08), navy);
    windshield.position.set(1.65, 1.02, 1.86);
    windshield.rotation.y = -0.18;
    loco.add(windshield);
    const windshield2 = windshield.clone();
    windshield2.position.z = -1.86;
    loco.add(windshield2);
    const frontPanel = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.75, 2.65), darkSilver);
    frontPanel.position.set(2.78, -0.1, 0);
    loco.add(frontPanel);
    const headlightMat = new THREE.MeshStandardMaterial({ color: '#fff7d0', emissive: '#fff0a8', emissiveIntensity: 8 });
    [-0.78, 0.78].forEach(z => {
      const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.22, 18, 18), headlightMat);
      lamp.position.set(2.84, 0.35, z);
      loco.add(lamp);
    });
    const locoLight = new THREE.PointLight('#fff2b0', 14, 25, 2);
    locoLight.position.set(3.2, 0.3, 0);
    loco.add(locoLight);
    [-1.7, 1.7].forEach(wx => {
      const bogie = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.35, 2.5), darkSilver);
      bogie.position.set(wx, -1.55, 0);
      loco.add(bogie);
      [-0.76, 0.76].forEach(wz => {
        const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.24, 24), navy);
        wheel.rotation.x = Math.PI / 2;
        wheel.position.set(wx, -1.72, wz);
        loco.add(wheel);
        wheels.push(wheel);
      });
    });
    loco.position.set(9.15, 0, 0);
    train.add(loco);
    // Roof-mounted pantograph: a small moving mechanical detail that makes the train read as an electric intercity set.
    const pantograph = new THREE.Group();
    const pMetal = new THREE.MeshStandardMaterial({ color: '#687985', metalness: 0.9, roughness: 0.22 });
    const p1 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.7, 0.08), pMetal);
    const p2 = p1.clone();
    p1.rotation.z = 0.48; p2.rotation.z = -0.48;
    p1.position.x = -0.34; p2.position.x = 0.34;
    pantograph.add(p1, p2);
    const pbar = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.08, 0.08), pMetal);
    pbar.position.y = 0.82;
    pantograph.add(pbar);
    pantograph.position.set(7.8, 2.1, 0);
    train.add(pantograph);

    train.position.set(-30, 0, 0);
    train.scale.setScalar(1.12);
    scene.add(train);

    // Twin headlight beams.
    const beam1 = new THREE.SpotLight('#fff6cf', 35, 48, Math.PI / 12, 0.55, 1.5);
    const beam2 = new THREE.SpotLight('#fff6cf', 35, 48, Math.PI / 12, 0.55, 1.5);
    beam1.position.set(12.1, 0.35, 0.82);
    beam2.position.set(12.1, 0.35, -0.82);
    beam1.target.position.set(22, -0.7, 0.82);
    beam2.target.position.set(22, -0.7, -0.82);
    train.add(beam1, beam2, beam1.target, beam2.target);

    // Second train: a smaller commuter set that continuously crosses the lower part of the
    // first page. It is deliberately separate from the scroll-controlled main train.
    const secondTrain = train.clone(true);
    secondTrain.scale.setScalar(0.68);
    secondTrain.position.set(-70, -0.30, 4.6);
    scene.add(secondTrain);

    // Subtle overhead electrical line/pantograph details.
    const lineMat = new THREE.LineBasicMaterial({ color: '#4d6877', transparent: true, opacity: 0.65 });
    const lineGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-75, 7.6, 0), new THREE.Vector3(75, 7.6, 0)]);
    world.add(new THREE.Line(lineGeo, lineMat));
    for (let x = -70; x <= 70; x += 10) {
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.07, 8.8, 8), darkSilver);
      pole.position.set(x, 2.8, 0);
      world.add(pole);
    }

    // Floating route particles / motion streaks.
    const particlePositions: THREE.Vector3[] = [];
    for (let i = 0; i < 320; i++) {
      particlePositions.push(new THREE.Vector3((Math.random() - 0.5) * 150, Math.random() * 24 - 2, (Math.random() - 0.5) * 55 - 3));
    }
    const particleGeo = new THREE.BufferGeometry().setFromPoints(particlePositions);
    const particles = new THREE.Points(particleGeo, new THREE.PointsMaterial({ color: '#bcecff', size: 0.055, transparent: true, opacity: 0.48 }));
    scene.add(particles);

    // Fast horizontal streaks near the camera reinforce physical speed without a fake toy look.
    const streakGeo = new THREE.BufferGeometry();
    const streakData = new Float32Array(120 * 6);
    for (let i = 0; i < 120; i++) {
      const x = (Math.random() - 0.5) * 120;
      const y = -0.3 + Math.random() * 5.5;
      const z = 5 + Math.random() * 12;
      streakData[i*6] = x; streakData[i*6+1] = y; streakData[i*6+2] = z;
      streakData[i*6+3] = x - (1.2 + Math.random()*3.0); streakData[i*6+4] = y; streakData[i*6+5] = z;
    }
    streakGeo.setAttribute('position', new THREE.BufferAttribute(streakData, 3));
    const streaks = new THREE.LineSegments(streakGeo, new THREE.LineBasicMaterial({ color:'#b8e9ff', transparent:true, opacity:0.22 }));
    scene.add(streaks);

    // Large soft sun gives the environment cinematic colour.
    const sunDisc = new THREE.Mesh(new THREE.SphereGeometry(3.4, 32, 32), new THREE.MeshBasicMaterial({ color: '#ffd58a' }));
    sunDisc.position.set(-25, 17, -45);
    scene.add(sunDisc);

    const scroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      scrollRef.current = scrollY / max;

      // Keep the hero trains tied to the actual first-page journey rather than the
      // total document length. This prevents the second train from lingering into
      // About/Packages while the global background can still move throughout the site.
      const hero = document.getElementById('home');
      const heroMax = hero ? Math.max(1, hero.offsetHeight - innerHeight) : Math.max(1, innerHeight * 2);
      heroScrollRef.current = Math.max(0, Math.min(1, scrollY / heroMax));
    };
    addEventListener('scroll', scroll, { passive: true });
    scroll();

    const resize = () => {
      const w = mount.clientWidth || innerWidth;
      const h = mount.clientHeight || innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    resize();
    addEventListener('resize', resize);

    const clock = new THREE.Clock();
    let raf = 0;
    const animate = () => {
      const t = clock.getElapsedTime();
      const p = scrollRef.current;
      const heroP = heroScrollRef.current;
      portal.rotation.z = t * .18; portalInner.rotation.z = -t * .25; portalGroup.position.y = 6 + Math.sin(t*.8)*.35;
      beaconCore.rotation.y = t*.8; ringA.rotation.z = t*.9; ringB.rotation.z = -t*.55; beacon.position.y = 4 + Math.sin(t*1.15)*.3;
      const eased = p * p * (3 - 2 * p);

      // Main train: scroll drives the journey, but it never waits for an intro timer.
      // The train remains in motion and the environment moves with the scroll.
      const heroEased = heroP * heroP * (3 - 2 * heroP);
      const journeyX = THREE.MathUtils.lerp(-32, 28, heroEased);
      train.position.x = journeyX;
      train.position.y = Math.sin(t * 5.2) * 0.035;
      train.rotation.y = Math.sin(p * Math.PI) * -0.035;
      train.rotation.z = Math.sin(t * 3.2) * 0.002;

      // Foreground commuter train: purely time-based, seamless left-to-right loop.
      // It stays prominent through the hero and gently fades after the opening journey.
      const secondCycle = ((t * 8.5) % 180) - 90;
      secondTrain.position.x = secondCycle;
      secondTrain.position.y = -0.30 + Math.sin(t * 5.8) * 0.018;
      const secondVisibility = THREE.MathUtils.smoothstep(heroP, 0.72, 0.98);
      secondTrain.visible = heroP < 0.995;
      secondTrain.scale.setScalar(0.68 * (1 - secondVisibility * 0.72));
      wheels.forEach((w, i) => { w.rotation.z -= 0.12; w.rotation.x = Math.sin(t * 0.8 + i) * 0.01; });
      coachGroups.forEach((car, i) => {
        car.rotation.y = Math.sin(t * 2.3 + i * 0.8) * 0.0035;
        car.position.y = Math.sin(t * 5 + i) * 0.008;
      });
      people.forEach(person => { person.rotation.y = Math.sin(t * 1.1 + person.position.x) * 0.05; });
      stationPeople.forEach((person, i) => { person.rotation.y = Math.sin(t * .8 + i) * .05; person.position.y = -.55 + Math.sin(t * 1.1 + i) * .012; });
      windowLights.forEach((light, i) => {
        const pulse = 0.10 + 0.045 * (0.5 + 0.5 * Math.sin(t * 1.4 + i * 0.7));
        (light.material as THREE.MeshBasicMaterial).opacity = pulse;
      });
      pantograph.rotation.z = Math.sin(t * 2.4) * 0.015;

      // Scroll makes the entire railway world travel behind the visitor.
      // This is intentionally stronger than the old subtle 18-unit drift so the background
      // visibly runs while scrolling instead of feeling like a static backdrop.
      world.position.x = -p * 46;
      particles.position.x = -p * 38;
      streaks.position.x = ((t * 10) % 24) - 12;
      warm.intensity = 10 + Math.sin(t * 0.8) * 1.5;
      beam1.intensity = 28 + Math.sin(t * 8) * 2;
      beam2.intensity = 28 + Math.sin(t * 8 + 0.3) * 2;

      // The world visibly changes while scrolling: bright station -> lush green countryside -> warm sunset arrival.
      const colors = [
        new THREE.Color('#79d9ff'),
        new THREE.Color('#a7e7b0'),
        new THREE.Color('#77b96b'),
        new THREE.Color('#f4b56b'),
        new THREE.Color('#173d2d')
      ];
      const stops = [0, 0.22, 0.48, 0.76, 1];
      let a = 0, b = 1;
      for (let i = 0; i < stops.length - 1; i++) if (p >= stops[i] && p <= stops[i + 1]) { a = i; b = i + 1; break; }
      const local = (p - stops[a]) / (stops[b] - stops[a]);
      const sky = colors[a].clone().lerp(colors[b], local);
      (scene.background as THREE.Color).copy(sky);
      (scene.fog as THREE.Fog).color.copy(sky);

      camera.position.x = Math.sin(p * Math.PI * 1.1) * 2.2;
      camera.position.y = 4.35 + Math.sin(p * Math.PI) * 0.9;
      camera.position.z = 21 - Math.sin(p * Math.PI) * 1.8;
      camera.lookAt(1.5, 0.05, 0);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('scroll', scroll);
      removeEventListener('resize', resize);
      scene.traverse(obj => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) (Array.isArray(mesh.material) ? mesh.material : [mesh.material]).forEach(m => m.dispose());
      });
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={ref} className="global-journey-scene" aria-hidden="true" />;
}
