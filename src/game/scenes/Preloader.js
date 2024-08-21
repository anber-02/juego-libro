import { Scene } from 'phaser';
import { actors } from '../../data/data';
import { animationsMainCharacter } from '../animationsMainCharacter';

export class Preloader extends Scene {
    constructor() {
        super('Preloader');
    }

    init() {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(512, 384, 'background');

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload() {
        // Cargar a todos los personajes y tiles a utilizar
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');

        // Objects
        this.load.image('car', 'objects/car.png')


        this.load.spritesheet(actors.primer_ciego.name, 'characters/man-black.png',{
                frameWidth: 62, frameHeight: 61,
            })
        this.load.spritesheet(actors.esposa_del_primer_ciego.name, 'characters/girl.png',{
                frameWidth: 30, frameHeight: 30,
            })

        // Cargando los assets
        this.load.spritesheet('people', 'characters/main.png', {
            frameWidth: 48, frameHeight: 48

        })
        // floor 
        this.load.image('floor', 'grounds/ground_2.png')

        // background
        this.load.image('background-2', 'scenes/house-internal.png')
        this.load.image('background-3', 'scenes/medical-house.jpg')

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
