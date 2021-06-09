import * as THREE from "./lib/three.module.js";
import { OrbitControls } from "./lib/OrbitControls.js"; //tourner autour de sa scene
import Stats from "./lib/stats.module.js";
    


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
        this.renderer = new THREE.WebGLRenderer(); // ({alpha: true, antialias: true})(alpha true permet de mettre en transparence la couleur du background du canva, antialiasing signifie rendre lisse l'élèment)
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

        this.boxGeometry = new THREE.BoxGeometry(.5, .5, .5);
        const redMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000});

        this.sphereGeometry = new THREE.SphereGeometry(.3,12,12);
        const greenMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00});

        this.planeGeometry = new THREE.PlaneGeometry(3, 3);
        const whiteMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side : THREE.DoubleSide});

        this.boxMesh = new THREE.Mesh(this.boxGeometry, redMaterial);
        this.sphereMesh = new THREE.Mesh(this.sphereGeometry, greenMaterial);
        this.sphereMesh.position.x = -1;

        this.planeMesh = new THREE.Mesh(this.planeGeometry, whiteMaterial);
        this.planeMesh.rotation.x = THREE.Math.degToRad(-90);
        this.planeMesh.position.y = -1;

        //var clone = this.boxMesh.clone(); // cloner un obj à l'état actuel
        //clone.position.x = 1;
        //this.boxMesh.material.Color = new THREE.color("000000ff"); 
        //this.boxMesh.visible =false; //retirer un obj de la scene
        
        this.scene.add(this.boxMesh);
        this.scene.add(this.planeMesh);
        this.scene.add(this.sphereMesh);


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