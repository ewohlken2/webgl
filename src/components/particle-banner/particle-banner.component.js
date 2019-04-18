import DomComponent from "Library/DomComponent";
import * as THREE from 'three';
import "./_particle-banner.component.scss";
import { each } from "../../js/utility/dom";

export default class ParticleBannerComponent extends DomComponent {
    static name = 'particle-banner';

    constructor(el) {
        super(el);

        new webGLComponent(this.el);

        setTimeout(this.loaded.bind(this));
    }
}

const PARTICLE_SIZE = 20; 

class webGLComponent {

    constructor(el) {
        var 

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
        this.camera.position.z = 250;

        // getx vertexes from regular 3d box for reference, we use this to create a less expensive rendering with BufferGeometry
        const vertices = new THREE.BoxGeometry( 200, 200, 200, 16, 16, 16 ).vertices;


        console.log(vertices);

        // stores x,y,z coords for each vertix
        this.positions = new Float32Array( vertices.length * 3 );
        
        // colors for each point (rba)
        this.colors = new Float32Array( vertices.length * 3 );

        // point size, I dont think we need this because the sizes no longer grow 
        this.sizes = new Float32Array( vertices.length );
        
        let color = new THREE.Color();
        let vertex;
        for ( let i = 0, l = vertices.length; i < l; i ++ ) {
            vertex = vertices[ i ];
            vertex.toArray( this.positions, i * 3 );
            color.setHSL( 0.01 + 0.1 * ( i / l ), 1.0, 0.5 );
            color.toArray( colors, i * 3 );
            this.sizes[ i ] = PARTICLE_SIZE * 0.5;
        }

    }

    animate() {

    }
}