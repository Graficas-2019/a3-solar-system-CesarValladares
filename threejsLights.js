var renderer = null, 
scene = null, 
camera = null,
root = null,
group = null,
sphere = null,
sphereEnvMapped = null,
orbitControls = null;

var Solar_system = null;
var MercuryPath;
var VenusPath;

var tmercury = 0;

var duration = 20000; // ms
var currentTime = Date.now();
function animate() {

    var now = Date.now();
    var deltat = now - currentTime;
    currentTime = now;
    var fract = deltat / duration;
    var angle = Math.PI * 2 * fract;

    // Solar system pos
    Solar_system.rotation.x = Math.PI/2

    // Rotate the sphere group about its Y axis
    Sunmesh.rotation.y += angle;
    Sunmesh.rotation.x = Math.PI/2;
    Mercurymesh.rotation.y -= angle*2;
    Mercurymesh.rotation.x = Math.PI/2;

    // Translate

    // Mercury
    tmercury += 0.01;

    Mercurymesh.position.x = 15 * Math.cos(tmercury);
    Mercurymesh.position.y = 15 * Math.sin(tmercury);



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

    // Path Mercury
    MercuryPath = new THREE.EllipseCurve(0,0,15,15,0,  2 * Math.PI,true,0);
    var merpot = MercuryPath.getPoints( 50 );
    var geometry = new THREE.BufferGeometry().setFromPoints( merpot );
    var material = new THREE.MeshPhongMaterial( {color: 'white', } );
    var ellipseMer = new THREE.Line( geometry, material );

    Solar_system.add(ellipseMer)

    // Path Venus
    VenusPath = new THREE.EllipseCurve(0,0,20,20,0,  2 * Math.PI,true,0);
    var merpot = VenusPath.getPoints( 50 );
    var geometry = new THREE.BufferGeometry().setFromPoints( merpot );
    var material = new THREE.MeshPhongMaterial( {color: 'white', } );
    var ellipseVen = new THREE.Line( geometry, material );

    Solar_system.add(ellipseVen)

}

function createScene(canvas) {
    
    // Create the Three.js renderer and attach it to our canvas
    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );

    // Set the viewport size
    renderer.setSize(canvas.width, canvas.height);

    // Create a new Three.js scene
    scene = new THREE.Scene();

    // Add  a camera so we can view the scene
    camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 1, 4000 );
    camera.position.set(-2, 6, 120);
    scene.add(camera);
    
    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
    orbitControls.target = new THREE.Vector3(0,0,0);
    
    // Create a group to hold all the objects
    root = new THREE.Object3D;

    pointLight = new THREE.PointLight (0xffffff, 1, 30);
    pointLight.position.set(0, 0, 0);
    root.add(pointLight);
    
    ambientLight = new THREE.AmbientLight ( 0x888888 );
    root.add(ambientLight);

    // Create a group to hold the Solar System
    Solar_system = new THREE.Object3D;
    root.add(Solar_system);

    createPaths()

    // Create the Sun geometry
    SunGeometry = new THREE.SphereGeometry(Math.sqrt(50), 50, 50);
    map = new THREE.TextureLoader().load("textures/sun/sunmap.jpg");
    
    // And put the geometry and material together into a mesh
    Sunmesh = new THREE.Mesh(SunGeometry, new THREE.MeshBasicMaterial({map:map}));
    Sunmesh.position.y = 0;

    // Add the mesh to our group
    Solar_system.add(Sunmesh);

    // Create the Mercury geometry
    MercuryGeometry = new THREE.SphereGeometry(Math.sqrt(1), 50,50);
    map = new THREE.TextureLoader().load("textures/mercury/mercurymap.jpg");

    Mercurymesh = new THREE.Mesh(MercuryGeometry, new THREE.MeshPhongMaterial({map:map}));
    Mercurymesh.position.x = 15

    // Create the Venus geometry
    VenusGeometry = new THREE.SphereGeometry(Math.sqrt(2), 50,50);
    //maps = new THREE.TextureLoader

    // Add the mesh to the group
    Solar_system.add(Mercurymesh)
    
    // Now add the group to our scene
    scene.add( root );
}
