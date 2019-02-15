var renderer = null, 
scene = null, 
camera = null,
root = null,
group = null,
sphere = null,
sphereEnvMapped = null,
orbitControls = null;

var Solar_system = null;
var Earth_group = null;
var Jupyter_group = null;
var Saturno_group = null;
var Uranus_group = null;
var Neptune_group = null;
var Pluto_group = null;
var Path;

var tmercury = 0;
var tvenus = 0;
var tearth = 0;
var tmoon = 0; 
var tmars = 0;
var tjup = 0;
var tsat = 0;
var tura = 0;
var tnept = 0; 
var tplut = 0;

var duration = 20000; // ms
var currentTime = Date.now();

// Moons arrays
var JupyterMoons = [10];
var SaturnMoons = [10];
var UranusMoons = [10];
var NeptuneMoons = [10];
var PlutoMoons = [5];
var Asteroids = [200];
var AsteX = [200];
var AsteY = [200];
var VelAst = [200];

function RotateSate (moon_group, num_moon){

    for (i = 0; i < num_moon; i++){

        pos = (i*2)+Math.sqrt(50)+1

        moon_group[i].position.x = -pos * Math.cos(tmoon/i);
        moon_group[i].position.y = -pos * Math.sin(tmoon/i);
    }
}

function RotateAste(){

    var now = Date.now();
    var deltat = now - currentTime;
    currentTime = now;
    var fract = deltat / duration;
    var angle = 1;
    
    for (i = 0; i < 200; i++){

        
        Asteroids[i].position.x = -AsteX[i] * Math.cos(tmoon/VelAst[i]);
        Asteroids[i].position.y = -AsteX[i] * Math.sin(tmoon/VelAst[i]);
        
        Asteroids[i].rotation.y += angle/VelAst[i];
        Asteroids[i].rotation.x = -Math.PI/2;
    
    }
}

function animate() {

    var now = Date.now();
    var deltat = now - currentTime;
    currentTime = now;
    var fract = deltat / duration;
    var angle = Math.PI * 2 * fract * 5;
    

    // Solar system pos
    Solar_system.rotation.x = Math.PI/2

    // SUN
    Sunmesh.rotation.y += angle;
    Sunmesh.rotation.x = -Math.PI/2;

    // MERCURY
    tmercury += 0.01;
    Mercurymesh.position.x = -15 * Math.cos(tmercury);
    Mercurymesh.position.y = -15 * Math.sin(tmercury);

    Mercurymesh.rotation.y += angle;
    Mercurymesh.rotation.x = -Math.PI/2;

    // VENUS
    tvenus +=0.009;
    Venusmesh.position.x = -25 *Math.cos(tvenus);
    Venusmesh.position.y = 25 *Math.sin(tvenus);

    Venusmesh.rotation.y += angle;
    Venusmesh.rotation.x = -Math.PI/2;

    // EARTH GROUP 
    tearth += 0.008;
    Earth_group.position.x = -35 *Math.cos(tearth);
    Earth_group.position.y = -35 *Math.sin(tearth);

    Earthmesh.rotation.y += angle;
    Earthmesh.rotation.x = -Math.PI/2;

    // MOON
    tmoon += 0.05;
    Moonmesh.position.x = -3 *Math.cos(tmoon);
    Moonmesh.position.y = -3 *Math.sin(tmoon);

    Moonmesh.rotation.y += angle;
    Moonmesh.rotation.x = -Math.PI/2;

    // MARS
    tmars+= 0.007;
    Marsmesh.position.x = -45 *Math.cos(tmars);
    Marsmesh.position.y = -45 *Math.sin(tmars);

    Marsmesh.rotation.y += angle;
    Marsmesh.rotation.x = -Math.PI/2;

    // JUPYTER

    tjup += 0.006;
    Jupyter_group.position.x = -100 * Math.cos(tjup);
    Jupyter_group.position.y = -100 * Math.sin(tjup);

    Jupymesh.rotation.y += angle;
    Jupymesh.rotation.x = -Math.PI/2;

    // JUPYTER MOONS   

    RotateSate(JupyterMoons,10);

    // SATURNO

    tsat += 0.005;
    Saturno_group.position.x = -200* Math.cos(tsat);
    Saturno_group.position.y = -200* Math.sin(tsat);

    Satmesh.rotation.y += angle;
    Satmesh.rotation.x = -Math.PI/2;
    Ringmesh.rotation.z += angle;
    
    // SATURN MOONS   

    RotateSate(SaturnMoons, 10);

    // URANUS
    
    tura += 0.004
    Uranus_group.position.x = -300* Math.cos(tura);
    Uranus_group.position.y = -300* Math.sin(tura);

    Uranusmesh.rotation.y += angle;
    Uranusmesh.rotation.x = Math.PI/2;

    // URANUS MOONS

    RotateSate(UranusMoons, 10)

    // NEPTUNE 
    tnept += 0.003
    Neptune_group.position.x = -400 * Math.cos(tnept);
    Neptune_group.position.y = -400 * Math.sin(tnept);

    NeptuneMesh.rotation.y += angle;
    NeptuneMesh.rotation.x = Math.PI/2;

    // NEPTUNE MOONS

    RotateSate(NeptuneMoons, 10);

    // PLUTO

    tplut += 0.002;
    Pluto_group.position.x = -500* Math.cos(tplut);
    Pluto_group.position.y = -500* Math.sin(tplut);

    // PLUTO MOONS 

    RotateSate(PlutoMoons, 5);

    // ASTEOIDS

    RotateAste();

}

function run() {
    requestAnimationFrame(function() { run(); });
    
        // Render the scene
        renderer.render( scene, camera );

        // Spin the cube for next frame
        animate();

        // Update the camera controller
        orbitControls.update();
}

function setLightColor(light, r, g, b)
{
    r /= 255;
    g /= 255;
    b /= 255;
    
    light.color.setRGB(r, g, b);
}

function toggleLight(light)
{
}

function toggleTexture()
{
    textureOn = !textureOn;
    var names = materialName.split("-");
    if (!textureOn)
    {
        setMaterial(names[0]);
    }
    else
    {
        setMaterial(names[0] + "-textured");
    }
}

var directionalLight = null;
var spotLight = null;
var pointLight = null;
var ambientLight = null;
var mapUrl = null;

function createPaths(){


    for (var i = 10 ; i < 50; i+= 10){

        Path = new THREE.EllipseCurve(0,0,i+5,i+5,0,  2 * Math.PI,true,0);
        var merpot = Path.getPoints( 50 );
        var geometry = new THREE.BufferGeometry().setFromPoints( merpot );
        var material = new THREE.MeshPhongMaterial( {color: 'white', } );
        var ellipse = new THREE.Line( geometry, material );

        Solar_system.add(ellipse)

    }

    for (var i = 100 ; i < 600; i+= 100){

        MercuryPath = new THREE.EllipseCurve(0,0,i,i,0,  2 * Math.PI,true,0);
        var merpot = MercuryPath.getPoints( 50 );
        var geometry = new THREE.BufferGeometry().setFromPoints( merpot );
        var material = new THREE.MeshPhongMaterial( {color: 'white', } );
        var ellipse = new THREE.Line( geometry, material );

        Solar_system.add(ellipse)

    }
    
}   

function createMoons(num_moons, size, moons, group){


    for (i = 0; i < num_moons; i++){

        MoonGeometry = new THREE.SphereGeometry(Math.sqrt(0.4), 50, 50); 
        map = new THREE.TextureLoader().load("textures/moon/moonmap.jpg");
        Moonpmesh = new THREE.Mesh(MoonGeometry, new THREE.MeshPhongMaterial({map:map}));
        pos = (i*2)+size+1;
        Moonpmesh.position.x = pos

        
        randnum = Math.floor(Math.random()*(6)+1);
        randsig = Math.floor(Math.random() * 2);
        if (randsig == 0){randnum *= -1}
        Moonpmesh.position.z = randnum;

        moons[i] = Moonpmesh;

        group.add(moons[i]);
    }
}

function createAsteroids(num_asteroids){

    for (i = 0; i < num_asteroids; i++){

        AsteroidGeometry = new THREE.SphereGeometry(Math.sqrt(1.2), 50,50);
        map = new THREE.TextureLoader().load("textures/asteroid/asteroidmap.jpg");
        AsteroidMesh = new THREE.Mesh(AsteroidGeometry, new THREE.MeshPhongMaterial({map:map}));

        posx = Math.floor(Math.random()*20)+60
        posz = Math.floor(Math.random()*(6)+1);

        randsig = Math.floor(Math.random() * 2);
        randsig3 = Math.floor(Math.random() * 2);

        if (randsig == 0){posx *= -1}
        if (randsig3 == 0){posz *= -1}

        AsteroidMesh.position.x = posx;
        AsteroidMesh.position.z = posz;

        Asteroids[i] = AsteroidMesh;
        
        AsteX[i] = Asteroids[i].position.x;

        Solar_system.add(Asteroids[i]);

        randnum = Math.floor(Math.random()*20)+20;
        VelAst[i] = randnum;
    }

}


function createPlanets(){

    // SUN
    SunGeometry = new THREE.SphereGeometry(Math.sqrt(100), 50, 50);
    map = new THREE.TextureLoader().load("textures/sun/sunmap.jpg");
    Sunmesh = new THREE.Mesh(SunGeometry, new THREE.MeshBasicMaterial({map:map}));
    Sunmesh.position.y = 0;

    // MERCURY
    MercuryGeometry = new THREE.SphereGeometry(Math.sqrt(1), 50,50);
    map = new THREE.TextureLoader().load("textures/mercury/mercurymap.jpg");
    bumpMap = new THREE.TextureLoader().load("textures/mercury/mercurybump.png");
    Mercurymesh = new THREE.Mesh(MercuryGeometry, new THREE.MeshPhongMaterial({map:map, bumpMap:bumpMap, bumpScale:0.1}));
    Mercurymesh.position.x = 15

    // VENUS
    VenusGeometry = new THREE.SphereGeometry(Math.sqrt(1.5), 50,50);
    map = new THREE.TextureLoader().load("textures/venus/venusmap.jpg");
    bumpMap = new THREE.TextureLoader().load("textures/venus/venusbump.jpg");
    Venusmesh = new THREE.Mesh(VenusGeometry, new THREE.MeshPhongMaterial({map:map, bumpMap:bumpMap, bumpScale:0.1}));
    Venusmesh.position.x = 25

    // EARTH GROUP
    Earth_group = new THREE.Object3D;
    Earth_group.position.x = 35

        // EARTH
        EarthGeometry = new THREE.SphereGeometry(Math.sqrt(2), 50, 50);
        map = new THREE.TextureLoader().load("textures/earth/earthmap.jpg");
        bumpMap = new THREE.TextureLoader().load("textures/earth/earthbump1k.jpg");
        Earthmesh = new THREE.Mesh(EarthGeometry, new THREE.MeshPhongMaterial({map:map, bumpMap:bumpMap, bumpScale:0.1}));
        Earthmesh.position.x = 0

        Earth_group.add(Earthmesh);

        // MOON 
        MoonGeometry = new THREE.SphereGeometry(Math.sqrt(0.4), 50, 50); 
        map = new THREE.TextureLoader().load("textures/earth/moonmap.jpg");
        bumpMap = new THREE.TextureLoader().load("textures/moon/bumpmap.jpg")
        Moonmesh = new THREE.Mesh(MoonGeometry, new THREE.MeshPhongMaterial({map:map, bumpMap:bumpMap, bumpScale:0.1}));
        Moonmesh.position.x = 3

        Earth_group.add(Moonmesh);

    // MARS
    MarsGeometry = new THREE.SphereGeometry(Math.sqrt(1.5), 50, 50);
    map = new THREE.TextureLoader().load("textures/mars/marsmap.jpg");
    bumpMap = new THREE.TextureLoader().load("textures/mars/marsbump1k.jpg")
    Marsmesh = new THREE.Mesh(MarsGeometry, new THREE.MeshPhongMaterial({map:map, bumpMap:bumpMap, bumpScale:0.1}));
    Marsmesh.position.x = 45

    // JUPYTER GROUP 
    Jupyter_group = new THREE.Object3D;
    Jupyter_group.position.x = 100

        // JUPYTER
        JupyterGeometry = new THREE.SphereGeometry(Math.sqrt(40), 50,50);
        map = new THREE.TextureLoader().load("textures/jupyter/jupyter.jpg");
        bumpMap = new THREE.TextureLoader().load("textures/jupyter/bumpmap.jpg");
        Jupymesh = new THREE.Mesh(JupyterGeometry, new THREE.MeshPhongMaterial({map:map, bumpMap:bumpMap, bumpScale:0.1}));
        Jupymesh.position.x = 0

        Jupyter_group.add(Jupymesh);

        // MOONS
        createMoons(10, Math.sqrt(50), JupyterMoons, Jupyter_group);

    // SATURNO GROUP
    Saturno_group = new THREE.Object3D;
    Saturno_group.position.x = 200;

        // SATURNO
        SaturnoGeometry = new THREE.SphereGeometry(Math.sqrt(35), 50,50);
        map = new THREE.TextureLoader().load("textures/saturn/saturn.jpg"); 
        Satmesh = new THREE.Mesh(SaturnoGeometry, new THREE.MeshPhongMaterial({map:map}));
        Satmesh.position.x = 0

        Saturno_group.add(Satmesh);

        // RING

        Ringgeometry = new THREE.RingGeometry( 10, 20, 32 );
        map = new THREE.TextureLoader().load("textures/saturn/ring2.png"); 
        Ringmesh = new THREE.Mesh( Ringgeometry, new THREE.MeshPhongMaterial( { map: map, side: THREE.DoubleSide }));
        
        Saturno_group.add(Ringmesh);

        // MOONS

        createMoons(10, Math.sqrt(45), SaturnMoons, Saturno_group);

    // URANUS GROUP
    Uranus_group = new THREE.Object3D;
    Uranus_group.position.x = 300;

        // URANUS
        UranusGeometry = new THREE.SphereGeometry(Math.sqrt(10), 50,50);
        map = new THREE.TextureLoader().load("textures/uranus/uranus.jpg");
        bumpMap = new THREE.TextureLoader().load("textures/uranus/bumpmap.jpg");
        Uranusmesh = new THREE.Mesh(UranusGeometry, new THREE.MeshPhongMaterial({map:map}));

        Uranus_group.add(Uranusmesh);

        // MOONS
        createMoons(10, Math.sqrt(10), UranusMoons, Uranus_group);


    // NEPTUNE GROUP
    Neptune_group = new THREE.Object3D;
    Neptune_group.position.x = 400;

        // NEPTUNE
        NeptuneGeometry = new THREE.SphereGeometry(Math.sqrt(10), 50,50);
        map = new THREE.TextureLoader().load("textures/neptune/neptunemap.jpg");
        NeptuneMesh = new THREE.Mesh(NeptuneGeometry, new THREE.MeshPhongMaterial({map:map}));

        Neptune_group.add(NeptuneMesh);

        // MOONS 

        createMoons(10, Math.sqrt(10), NeptuneMoons, Neptune_group);

    // PLUTO GROUP 
    Pluto_group = new THREE.Object3D;
    Pluto_group.position.x = 500;

        // PLUTO 
        PlutoGeometry = new THREE.SphereGeometry(Math.sqrt(1), 50,50);
        map = new THREE.TextureLoader().load("textures/pluto/plutomap.jpg");
        PlutoMesh = new THREE.Mesh(PlutoGeometry, new THREE.MeshPhongMaterial({map:map}));

        Pluto_group.add(PlutoMesh);

        // MOONS 

        createMoons(5, Math.sqrt(1), PlutoMoons, Pluto_group);

    // ASTEROIDS

    createAsteroids(200);

    // Add the mesh to the group
    Solar_system.add(Sunmesh);
    Solar_system.add(Mercurymesh);
    Solar_system.add(Venusmesh);
    Solar_system.add(Earth_group);
    Solar_system.add(Marsmesh);
    Solar_system.add(Jupyter_group);
    Solar_system.add(Saturno_group);
    Solar_system.add(Uranus_group);
    Solar_system.add(Neptune_group);
    Solar_system.add(Pluto_group);

}

function createScene(canvas) {
    
    // Create the Three.js renderer and attach it to our canvas
    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );

    // Set the viewport size
    renderer.setSize(canvas.width, canvas.height);

    // Create a new Three.js scene
    scene = new THREE.Scene();
    var backgroundImage = new THREE.TextureLoader().load("textures/space.jpg");
    scene.background = backgroundImage;

    // Add  a camera so we can view the scene
    camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 2, 5000 );
    camera.position.set(700, 1000, 200);
    scene.add(camera);
    
    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
    orbitControls.target = new THREE.Vector3(0,0,0);
    
    // Create a group to hold all the objects
    root = new THREE.Object3D;

    pointLight = new THREE.PointLight (0xffffff, 1, 200);
    pointLight.position.set(0, 0, 0);
    root.add(pointLight);
    
    ambientLight = new THREE.AmbientLight ( 0x888888 );
    root.add(ambientLight);

    // Create a group to hold the Solar System
    Solar_system = new THREE.Object3D;
    root.add(Solar_system);

    createPaths();

    createPlanets();
    
    // Now add the group to our scene
    scene.add( root );
}
