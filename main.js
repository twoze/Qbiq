import * as THREE from "./lib/three.module.js";
import { OrbitControls } from "./lib/OrbitControls.js"; //tourner autour de sa scene
import Stats from "./lib/stats.module.js";
import Objects from "./objects.js";
import tree from "./tree.js";
    


export default class Main {

    constructor() {

        this.update = this.update.bind(this); // donne l'acces aux obj de update
        this.onResize = this.onResize.bind(this);
        this.scene;
        this.camera;
        this.renderer;

        this.init();

    }

    init() {

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({alpha: true, antialias: true}); // ({alpha: true, antialias: true})(alpha true permet de mettre en transparence la couleur du background du canva, antialiasing signifie rendre lisse l'élèment)
        this.renderer.setSize(window.innerWidth, window.innerHeight);



        this.camera.position.z = 2;

        window.addEventListener('resize', this.onResize, false);
 
        document.body.appendChild(this.renderer.domElement);

        this.stats = new Stats();
        document.body.appendChild(this.stats.dom);// permet d'afficher les frames sur notre page

        new OrbitControls(this.camera, this.renderer.domElement); // intéragir directement avec les elements du dom

        this.update();

        this.initobjects();

    }

    initobjects() {

        this.objects = new Objects();
        this.scene.add(this.objects);

        this.tree = new tree();
        this.scene.add(this.tree);
    }

    onResize() {

        const width = window.innerWidth;
        const height = window.innerHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix;
        this.renderer.setSize(width, height);
            
        
    }

    update() {

        requestAnimationFrame(this.update);
        
        //this.sphereGeometry.rotation.y += 0.01; //(faire tourner l'obj)
        this.renderer.render(this.scene, this.camera);

        this.stats.update();

    }
}

new Main();