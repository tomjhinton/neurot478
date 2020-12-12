const THREE = require('three')


const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )

const renderer = new THREE.WebGLRenderer()
renderer.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild( renderer.domElement )



var createGeometry = require('three-bmfont-text')
var loadFont = require('load-bmfont')

loadFont('assets/ArtDystopia.otf', function(err, font) {
  // create a geometry of packed bitmap glyphs,
  // word wrapped to 300px and right-aligned
  var geometryT = createGeometry({
    width: 300,
    align: 'right',
    font: font
  })
})


const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
const cube = new THREE.Mesh( geometry, material )
scene.add( cube )

camera.position.z = 5

function animate() {
  requestAnimationFrame( animate )


  cube.rotation.x += 0.01
  cube.rotation.y += 0.01

  renderer.render( scene, camera )
}
animate()
