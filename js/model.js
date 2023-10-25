import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

THREE.ColorManagement.enabled = false

/**
 * Base
 */

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xf7f7f7);


/**
 * Models
 */
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderConfig({ type: 'js' });
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

let mixer = null

gltfLoader.load(
    './js/heart-model-2.glb',
    (gltf) =>
    {
        gltf.scene.scale.set(0.03, 0.03, 0.03)
        gltf.scene.position.set(0, -0.6, 0.2);
        scene.add(gltf.scene)

        gltf.scene.traverse(function(node) {
            if (node.isMesh) {
                node.castShadow = true;
            }
        });
        //gsap
        gsap.registerPlugin(ScrollTrigger);

            let tlScroll = gsap.timeline({
                    duration: 1,
                    scrollTrigger: {
                        trigger: 'body',
                        endTrigger: '#screen2',
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 1,
                        fov: 75,
                        // markers: true
                    },
                });
                ScrollTrigger.defaults({
                    immediateRender: false,
                    ease: 'power1.inOut',
                });
        
                //Slide1
                    tlScroll
                    .to(
                        camera.position, {
                            z: 3,
                            x: 0,
                            y: 0,
                            duration: 1,
                        },
                        '<'
                    )
                    .to(
                        gltf.scene.rotation, {
                            x: 0,
                            duration: 1,
                        },
                        '<'
                    )
                    .to(
                        gltf.scene.position, {
                            y: -1,
                            z: 0,
                            x: 0,
                            duration: 1,
                        },
                        '<'
                    )
                    .to(
                        gltf.scene.scale, {
                            x: 0.028,
                            y: 0.028,
                            z: 0.028,
                            duration: 1,
                        },
                        '<'
                    )
                    .to(
                        scene.fog, {
                            near: 3,
                            duration: 1,
                        },
                        '<'
                    )

                    let scrolltoThree = 
                    gsap.to(
                        camera.position, {
                            x: 0,
                            y: 0,
                            z: 3,
                            duration: 1,
                        },
                        
                        '<'
                    )
            
                    ScrollTrigger.create({
                        trigger: "#screen2",
                        endTrigger: "#screen3",
                        animation : scrolltoThree,
                        start: "top top",
                        end: "bottom bottom",
                        // markers: true,
                        scrub: 1,
                      });


                      let tlScroll2 = gsap.timeline({
                        duration: 2,
                        scrollTrigger: {
                            trigger: '#screen3',
                            endTrigger: '#screen4',
                            start: 'top top',
                            end: 'bottom bottom',
                            scrub: 1,
                            // markers: true,
                        },
        
                    });
            
                    tlScroll2
                        .to(
                            gltf.scene.rotation, {
                                x: 0.2,
                                duration: 1,
                            },
                            '<'
                        )
                        .to(
                            gltf.scene.position, {
                                y: 0.7,
                                z: 1.2,
                                duration: 1,
                            },
                            '<'
                        )
                        .to(
                            camera.position, {
                                y: 0,
                                x: 0,
                                z: 3.7,
                                duration: 1,
                            },
                            '<'
                        )
                }
    
)

const sections = document.querySelectorAll(".panel");

const scrolling = {
    enabled: true,
    events: "scroll,wheel,touchmove,pointermove".split(","),
    prevent: e => e.preventDefault(),
    disable() {
        if (scrolling.enabled) {
            scrolling.enabled = false;
            window.addEventListener("scroll", gsap.ticker.tick, { passive: true });
            scrolling.events.forEach((e, i) => (i ? document : window).addEventListener(e, { passive: false }));
        }
    },
    enable() {
        if (!scrolling.enabled) {
            scrolling.enabled = true;
            window.removeEventListener("scroll", gsap.ticker.tick);
            scrolling.events.forEach((e, i) => (i ? document : window).removeEventListener(e, scrolling.prevent));
        }
    }
};

function goToSection(section, anim, i) {
    if (scrolling.enabled) { // skip if a scroll tween is in progress
        scrolling.disable();
        gsap.to(window, {
            scrollTo: { y: section, autoKill: false },
            onComplete: scrolling.enable,
            duration: 1
        });

        anim && anim.restart();
    }
}

sections.forEach((section, i) => {
    ScrollTrigger.create({
        trigger: section,
        start: "top bottom-=1",
        end: "bottom top+=1",
        onEnter: () => goToSection(section),
        onEnterBack: () => goToSection(section)
    });
});

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 7)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 8
directionalLight.shadow.camera.left = - 8
directionalLight.shadow.camera.top = 8
directionalLight.shadow.camera.right = 8
directionalLight.shadow.camera.bottom = - 8
directionalLight.position.set(0, 0.5, 0)
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 0, 2)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, document.body)
controls.enableDamping = true
controls.enableRotate = false
controls.enableZoom = false
controls.rotateSpeed = 3
controls.update();

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.outputColorSpace = THREE.LinearSRGBColorSpace
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.7,
};

function observerCallback(entries, observer) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // fade in observed elements that are in view
            entry.target.classList.replace('fadeOut', 'fadeIn');
            // entry.target.classList.replace('panel-inactive', 'panel-active');
            
        } else {
            // fade out observed elements that are not in view
            entry.target.classList.replace('fadeIn', 'fadeOut');
            // entry.target.classList.replace('panel-active', 'panel-inactive');
        }
    });
}
const observer = new IntersectionObserver(observerCallback, observerOptions);

let handler = (entries, opts) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > opts.thresholds[0]) {
        const classesToRemove = findClassesWithActive(document.body.classList);
        if (classesToRemove.length > 0) {
          document.body.classList.remove(classesToRemove);
        }
        document.body.classList.add(entry.target.id + "-active");
      }
    });
  };

  var targets = document.querySelectorAll(".panel");
  
  targets.forEach((el) => {
    var observer = new IntersectionObserver(handler, observerOptions);
    observer.observe(el);
  });
  
  function findClassesWithActive([...classList]) {
    return classList.filter((c) => c.includes("-active"));
  }

const fadeElms = document.querySelectorAll('.fade');
// const panels = document.querySelectorAll(".panel")
fadeElms.forEach((el) => observer.observe(el));
// panels.forEach((el) => observer.observe(el));

$(window).on('resize scroll touchmove pointerdown', function() {
        if($('body').hasClass('screen2-active')) {
            controls.enableRotate = true;
        }  else if($('body').hasClass('screen3-active')) {
            controls.enableRotate = true;
        } else {
            controls.enableRotate = false;
        }
});
  

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Model animation
    if(mixer)
    {
        mixer.update(deltaTime)
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

