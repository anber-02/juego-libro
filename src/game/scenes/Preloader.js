import { Scene } from 'phaser';
import { animationsMainCharacter } from '../animationsMainCharacter';
import { loadCharacters } from './utils/loadCharacters';
import { loadBackgrounds } from './utils/loadBackgrounds';
import { centerBackground } from '../centerBackgrounds';

export class Preloader extends Scene {
    constructor() {
        super('Preloader');
    }

    init() {
        // Cargar y centrar la imagen de fondo
        centerBackground(this, 'background');

        // Crear un contorno para la barra de progreso (centrada en la pantalla)
        this.add.rectangle(300, 380, 500, 32).setStrokeStyle(1, 0xffffff);

        // Crear la barra de progreso
        const bar = this.add.rectangle(50, 380, 10, 28, 0xffffff);

        // Actualizar la barra de progreso según el porcentaje de carga
        this.load.on('progress', (progress) => {
            bar.width = 10 + (480 * progress);
        });
    }

    preload() {
        // Cargar a todos los personajes y tiles a utilizar
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');



        // LOAD CHARACTERS
        loadCharacters(this)


        // LOAD BACKGROUNDS
        loadBackgrounds(this)


        // Objects
        this.load.image('car', 'objects/car.png')
        this.load.spritesheet('play', 'objects/play.png',{
            frameWidth: 288, frameHeight: 124
        })
        // floor 
        this.load.image('floor', 'grounds/ground_2.png')


        // Music
        this.load.audio('inicio', 'music/inicio.mp3')

    }

    create() {
        // Crear animaciones para el personaje principal
        animationsMainCharacter(this)
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.
        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('MainMenu');

    }


}
