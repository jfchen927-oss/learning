// 🍊 Orange - Three.js 实时活动地球
// Live Activity Earth with Three.js

let scene, camera, renderer, earth, atmosphere, stars;
let markers = [];
let connections = [];
let isRotating = true;
let showConnections = true;
let raycaster, mouse;

// 主要城市坐标 (经纬度)
const cities = [
    { name: "北京", lat: 39.9042, lon: 116.4074, type: "active" },
    { name: "上海", lat: 31.2304, lon: 121.4737, type: "active" },
    { name: "东京", lat: 35.6762, lon: 139.6503, type: "active" },
    { name: "纽约", lat: 40.7128, lon: -74.0060, type: "warning" },
    { name: "伦敦", lat: 51.5074, lon: -0.1278, type: "active" },
    { name: "巴黎", lat: 48.8566, lon: 2.3522, type: "info" },
    { name: "悉尼", lat: -33.8688, lon: 151.2093, type: "active" },
    { name: "莫斯科", lat: 55.7558, lon: 37.6173, type: "warning" },
    { name: "迪拜", lat: 25.2048, lon: 55.2708, type: "active" },
    { name: "新加坡", lat: 1.3521, lon: 103.8198, type: "active" },
    { name: "洛杉矶", lat: 34.0522, lon: -118.2437, type: "info" },
    { name: "圣保罗", lat: -23.5505, lon: -46.6333, type: "warning" },
    { name: "开罗", lat: 30.0444, lon: 31.2357, type: "info" },
    { name: "孟买", lat: 19.0760, lon: 72.8777, type: "active" },
    { name: "首尔", lat: 37.5665, lon: 126.9780, type: "active" },
    { name: "曼谷", lat: 13.7563, lon: 100.5018, type: "info" },
    { name: "伊斯坦布尔", lat: 41.0082, lon: 28.9784, type: "warning" },
    { name: "香港", lat: 22.3193, lon: 114.1694, type: "active" },
    { name: "旧金山", lat: 37.7749, lon: -122.4194, type: "active" },
    { name: "多伦多", lat: 43.6532, lon: -79.3832, type: "info" }
];

// 初始化场景
function init() {
    // 场景
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000510);
    
    // 相机
    camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 22;
    
    // 渲染器
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('canvas-container').appendChild(renderer.domElement);
    
    // 鼠标交互
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    
    // 创建地球
    createEarth();
    
    // 创建大气层
    createAtmosphere();
    
    // 创建星空背景
    createStars();
    
    // 创建城市标记
    createCityMarkers();
    
    // 创建连线
    createConnections();
    
    // 添加光源
    addLights();
    
    // 事件监听
    window.addEventListener('resize', onWindowResize);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('click', onMouseClick);
    
    // 隐藏加载
    setTimeout(() => {
        document.getElementById('loading').style.opacity = 0;
        setTimeout(() => {
            document.getElementById('loading').style.display = 'none';
        }, 500);
    }, 1000);
    
    // 开始动画
    animate();
    
    // 更新统计数据
    updateStats();
}

// 创建地球
function createEarth() {
    const geometry = new THREE.SphereGeometry(5, 64, 64);
    
    // 创建地球纹理
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    // 绘制海洋背景
    const gradient = ctx.createLinearGradient(0, 0, 0, 512);
    gradient.addColorStop(0, '#001a33');
    gradient.addColorStop(0.5, '#003366');
    gradient.addColorStop(1, '#001a33');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1024, 512);
    
    // 绘制大陆轮廓（简化版）
    ctx.fillStyle = '#004d4d';
    
    // 北美
    drawContinent(ctx, [[100, 100], [200, 80], [250, 150], [200, 250], [150, 200], [80, 180]]);
    // 南美
    drawContinent(ctx, [[220, 280], [280, 300], [260, 400], [200, 380]]);
    // 欧洲
    drawContinent(ctx, [[450, 100], [520, 90], [550, 140], [500, 160], [460, 140]]);
    // 非洲
    drawContinent(ctx, [[480, 180], [560, 170], [580, 300], [520, 350], [460, 280]]);
    // 亚洲
    drawContinent(ctx, [[560, 80], [750, 60], [850, 120], [800, 200], [700, 220], [600, 180]]);
    // 澳洲
    drawContinent(ctx, [[800, 320], [900, 310], [920, 380], [820, 390]]);
    
    // 添加网格线
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 1024; i += 64) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 512);
        ctx.stroke();
    }
    for (let i = 0; i <= 512; i += 64) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(1024, i);
        ctx.stroke();
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    
    const material = new THREE.MeshPhongMaterial({
        map: texture,
        emissive: 0x001122,
        emissiveIntensity: 0.2,
        specular: 0x111111,
        shininess: 10
    });
    
    earth = new THREE.Mesh(geometry, material);
    scene.add(earth);
}

// 绘制大陆辅助函数
function drawContinent(ctx, points) {
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i][0], points[i][1]);
    }
    ctx.closePath();
    ctx.fill();
    
    // 添加发光边缘
    ctx.strokeStyle = 'rgba(0, 255, 200, 0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();
}

// 创建大气层
function createAtmosphere() {
    const geometry = new THREE.SphereGeometry(5.2, 64, 64);
    const material = new THREE.MeshPhongMaterial({
        color: 0x4488ff,
        transparent: true,
        opacity: 0.15,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending
    });
    
    atmosphere = new THREE.Mesh(geometry, material);
    scene.add(atmosphere);
    
    // 外层光晕
    const glowGeometry = new THREE.SphereGeometry(5.5, 64, 64);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x00aaff,
        transparent: true,
        opacity: 0.05,
        side: THREE.BackSide
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glow);
}

// 创建星空
function createStars() {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];
    
    for (let i = 0; i < 3000; i++) {
        const x = (Math.random() - 0.5) * 200;
        const y = (Math.random() - 0.5) * 200;
        const z = (Math.random() - 0.5) * 200;
        
        // 确保星星不在地球附近
        if (Math.sqrt(x*x + y*y + z*z) > 15) {
            vertices.push(x, y, z);
            
            // 随机星星颜色
            const color = new THREE.Color();
            color.setHSL(Math.random() * 0.2 + 0.5, 0.3, Math.random() * 0.5 + 0.5);
            colors.push(color.r, color.g, color.b);
        }
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
        size: 0.15,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });
    
    stars = new THREE.Points(geometry, material);
    scene.add(stars);
}

// 经纬度转3D坐标
function latLonToVector3(lat, lon, radius) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = (radius * Math.sin(phi) * Math.sin(theta));
    const y = (radius * Math.cos(phi));
    
    return new THREE.Vector3(x, y, z);
}

// 创建城市标记
function createCityMarkers() {
    cities.forEach((city, index) => {
        const position = latLonToVector3(city.lat, city.lon, 5);
        
        // 标记点
        const geometry = new THREE.SphereGeometry(0.08, 16, 16);
        let color;
        switch(city.type) {
            case 'active': color = 0x00ff88; break;
            case 'warning': color = 0xffaa00; break;
            case 'info': color = 0x00aaff; break;
            default: color = 0xffffff;
        }
        
        const material = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.9
        });
        
        const marker = new THREE.Mesh(geometry, material);
        marker.position.copy(position);
        marker.userData = { city: city, index: index };
        
        earth.add(marker);
        
        // 脉冲环效果
        const ringGeometry = new THREE.RingGeometry(0.12, 0.15, 32);
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.5,
            side: THREE.DoubleSide
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.position.copy(position);
        ring.lookAt(new THREE.Vector3(0, 0, 0));
        ring.userData = { isPulse: true, phase: Math.random() * Math.PI * 2 };
        
        earth.add(ring);
        
        markers.push({ marker, ring, city });
    });
}

// 创建城市间连线
function createConnections() {
    // 创建一些随机连接
    const connections = [
        [0, 1], [0, 7], [1, 6], [1, 17], [2, 14], [2, 9],
        [3, 10], [3, 18], [4, 5], [4, 7], [5, 16], [6, 9],
        [7, 13], [8, 13], [9, 17], [10, 18], [11, 18], [12, 16],
        [13, 17], [14, 17], [0, 14], [3, 11], [4, 16], [5, 12]
    ];
    
    connections.forEach(([startIdx, endIdx], index) => {
        const start = latLonToVector3(cities[startIdx].lat, cities[startIdx].lon, 5.05);
        const end = latLonToVector3(cities[endIdx].lat, cities[endIdx].lon, 5.05);
        
        // 创建曲线
        const mid = start.clone().add(end).multiplyScalar(0.5);
        mid.normalize().multiplyScalar(7); // 拱起高度
        
        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        const points = curve.getPoints(50);
        
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        
        // 渐变色
        const colors = [];
        const color1 = new THREE.Color(0x00ff88);
        const color2 = new THREE.Color(0x00aaff);
        
        for (let i = 0; i < points.length; i++) {
            const t = i / points.length;
            const color = color1.clone().lerp(color2, t);
            colors.push(color.r, color.g, color.b);
        }
        
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        
        const material = new THREE.LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            opacity: 0,
            linewidth: 2
        });
        
        const line = new THREE.Line(geometry, material);
        line.userData = { 
            phase: Math.random() * Math.PI * 2,
            speed: 0.5 + Math.random() * 0.5
        };
        
        earth.add(line);
        window.connections.push(line);
    });
}

// 添加光源
function addLights() {
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 5, 10);
    scene.add(directionalLight);
    
    // 背光（轮廓光）
    const backLight = new THREE.DirectionalLight(0x0044ff, 0.5);
    backLight.position.set(-10, -5, -10);
    scene.add(backLight);
}

// 鼠标移动
function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

// 鼠标点击
function onMouseClick(event) {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(earth.children);
    
    if (intersects.length > 0) {
        const obj = intersects[0].object;
        if (obj.userData.city) {
            console.log('选中城市:', obj.userData.city.name);
        }
    }
}

// 窗口大小变化
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// 动画循环
function animate() {
    requestAnimationFrame(animate);
    
    const time = Date.now() * 0.001;
    
    // 地球自转
    if (isRotating) {
        earth.rotation.y += 0.002;
    }
    
    // 星空缓慢旋转
    if (stars) {
        stars.rotation.y += 0.0002;
        stars.rotation.x += 0.0001;
    }
    
    // 脉冲动画
    markers.forEach(({ ring }) => {
        const phase = ring.userData.phase;
        const scale = 1 + Math.sin(time * 2 + phase) * 0.3;
        const opacity = 0.3 + Math.sin(time * 2 + phase) * 0.2;
        
        ring.scale.set(scale, scale, 1);
        ring.material.opacity = Math.max(0.1, opacity);
    });
    
    // 连线动画
    if (window.connections) {
        window.connections.forEach(line => {
            const phase = line.userData.phase;
            const speed = line.userData.speed;
            const opacity = 0.3 + Math.sin(time * speed + phase) * 0.3;
            line.material.opacity = showConnections ? Math.max(0, opacity) : 0;
        });
    }
    
    // 大气层呼吸效果
    if (atmosphere) {
        const scale = 1 + Math.sin(time * 0.5) * 0.01;
        atmosphere.scale.set(scale, scale, scale);
    }
    
    // 鼠标悬停效果
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(earth.children);
    
    document.body.style.cursor = 'default';
    markers.forEach(({ marker }) => {
        marker.scale.set(1, 1, 1);
    });
    
    if (intersects.length > 0) {
        const obj = intersects[0].object;
        if (obj.userData.city) {
            document.body.style.cursor = 'pointer';
            obj.scale.set(1.5, 1.5, 1.5);
        }
    }
    
    renderer.render(scene, camera);
}

// 更新统计数据
function updateStats() {
    setInterval(() => {
        document.getElementById('node-count').textContent = 
            Math.floor(1500 + Math.random() * 500);
        document.getElementById('connection-count').textContent = 
            Math.floor(800 + Math.random() * 300);
        document.getElementById('data-rate').textContent = 
            (Math.random() * 100 + 50).toFixed(1);
    }, 2000);
}

// 控制按钮功能
function toggleRotation() {
    isRotating = !isRotating;
}

function resetView() {
    earth.rotation.set(0, 0, 0);
    isRotating = true;
}

function toggleConnections() {
    showConnections = !showConnections;
}

// 初始化
window.connections = [];
init();
