import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { centerBackground } from '../centerBackgrounds';

export class MainMenu extends Scene {

    constructor() {
        super('MainMenu');
    }

    create() {
        this.sound.add('inicio', { volume: 0.2 }).play()
        // Cargar la imagen de fondo
        centerBackground(this, 'background-menu', { opacity: 1 });


        const playButton = this.add.sprite(300, 330, 'play').setInteractive();
        playButton.setOrigin(0.5, 0.5).setScale(0.5); 

        // Animaciones para el botón de play
        this.anims.create({
            key: 'normal',
            frames: [{ key: 'play', frame: 0 }],
        });

        this.anims.create({
            key: 'hover',
            frames: [{ key: 'play', frame: 1 }],
        });

        // Configurar las interacciones del botón
        playButton.on('pointerover', () => {
            playButton.play('hover');
            this.input.setDefaultCursor('pointer');
        });

        playButton.on('pointerout', () => {
            playButton.play('normal');
            this.input.setDefaultCursor('default');
        });

        playButton.on('pointerdown', () => {
            this.startGame();
        });

        // // Iniciar con el estado normal
        // playButton.play('normal');



        // !ESTE ES EL PERSONAJE PRINCIPAL
        this.people = this.physics.add.sprite(0, 400, 'people')
            .setOrigin(0, 1)
            .setGravity(0)
            .setCollideWorldBounds(true);


        this.cursors = this.input.keyboard.createCursorKeys();
        EventBus.emit('current-scene-ready', this);

    }



    update() {
        // Movimiento en el eje X
        if (this.cursors.left.isDown) {
            this.people.x -= 2;
            this.people.anims.play('people-walk-left', true);
        } else if (this.cursors.right.isDown) {
            this.people.x += 2;
            this.people.anims.play('people-walk-right', true);
        }

        // Movimiento en el eje Y
        if (this.cursors.up.isDown) {
            this.people.setVelocityY(-300);
            this.people.anims.play('people-walk-up', true);
        } else if (this.cursors.down.isDown) {
            this.people.setVelocityY(300);
            this.people.anims.play('people-walk-down', true);
        }

        // Detener la animación si no se presionan teclas
        if (!this.cursors.left.isDown && !this.cursors.right.isDown && !this.cursors.up.isDown && !this.cursors.down.isDown) {
            this.people.anims.stop();
        }
    }

    startGame() {
        this.scene.start('City')
    }

    goBackScene() {
        this.scene.start('MainMenu');
    }

}
