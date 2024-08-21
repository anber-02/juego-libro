import { centerBackground } from '../centerBackgrounds';
import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class City extends Scene {
    constructor() {
        super('City');
    }

    create() {
        // Calcular escala para ajustar la imagen de fondo
        centerBackground(this, 'background')

        this.add.image(896, 896, 'background').setAlpha(0);

        this.add.text(200, 100, 'Make something fun!\nand share it with us:\nsupport@phaser.io', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        EventBus.emit('current-scene-ready', this);
    }

    changeScene() {
        this.scene.start('MainMenu');
    }
}
