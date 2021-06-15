import * as THREE from "./lib/three.module.js";
import { GLTFLoader }  from './lib/GLTFLoader.js';

export default class tree extends THREE.Object3D {

    constructor() {
        super();
    

        const loader = new GLTFLoader();
        console.log(loader);
        loader.load('./assets/QBIQ_canape.glb', (object) => {

            console.log(object);
            
            this.add(object.scene);

        })
    }
}