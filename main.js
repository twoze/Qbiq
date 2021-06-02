import * as THREE from "./lib/three.module.js";

export default class Main {

    constructor() {

        this.scene;
        this.camera;
        this.render;

        this.init();

    }

    init() {

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.render = new THREE.WebGLRenderer();
        this.render.setSize(window.innerWidth, window.innerHeight);


        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000});
        this.cube = new THREE.Mesh(geometry, material);
        this.scene.add(this.cube);

        this.camera.position.z = 2;

        document.body.appendChild(this.render.domElement);

        this.render.render(this.scene, this.camera);

    }

}

new Main();