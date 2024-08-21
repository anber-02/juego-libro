import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { dialogues } from '../../data/data';
import { centerBackground } from '../centerBackgrounds';

export class CasaPrimerCiego extends Scene {

    constructor() {
        super('CasaPrimerCiego');
    }


    
    create() {
        // Cargar la imagen de fondo
        centerBackground(this, 'background-2')

        // Crear el cuadro de diálogo en la parte inferior
        this.dialogueBox = this.add.graphics();
        this.dialogueBox.fillStyle(0x000000, 0.7); // Color negro con 70% de opacidad
        this.dialogueBox.fillRect(50, 320, 500, 100); // Cuadro de diálogo en la parte inferior

        // Crear texto para el diálogo
        this.dialogueText = this.add.text(120, 330, '', {
            fontFamily: 'Arial',
            fontSize: 16,
            color: '#ffffff',
            wordWrap: { width: 360, useAdvancedWrap: true }
        });

        // Sprite del personaje principal a la izquierda del cuadro de diálogo
        this.mainCharacterSprite = this.add.sprite(60, 350, 'people', 0).setOrigin(0.5).setScale(1.5);

        // Sprite del personaje colisionado a la derecha del cuadro de diálogo
        this.dialogueCharacter = this.add.sprite(470, 350, 'primer-ciego', 2).setOrigin(0.5).setScale(1.5);

        // Botón de "Continuar"
        this.continueButton = this.add.text(500, 360, 'Continuar', {
            fontFamily: 'Arial',
            fontSize: 12,
            color: '#00ff00',
            backgroundColor: '#000000',
            padding: { left: 10, right: 10, top: 5, bottom: 5 },
            align: 'center'
        }).setInteractive().on('pointerdown', () => {
            this.hideDialogue();
        });

        // Ocultar todo inicialmente
        this.dialogueBox.setVisible(false);
        this.dialogueText.setVisible(false);
        this.mainCharacterSprite.setVisible(false);
        this.dialogueCharacter.setVisible(false);
        this.continueButton.setVisible(false);




        // Crear un TileSprite para el suelo
        // this.floor = this.add.tileSprite(0, 400 - 32, 600, 32, 'floor');
        // this.floor.setOrigin(0, 0);
        // // Hacer que el suelo sea estático y colisionable
        // this.physics.add.existing(this.floor, true);

        this.characters = []
        this.characters.push(
            this.physics.add.sprite(400, 200, 'primer-ciego', 2).setName('Primer Ciego')
        )
        //Cargar la img con physics
        this.people = this.physics.add.sprite(100, 100, 'people')
            .setOrigin(0, 1)
            .setGravity(0)
            .setCollideWorldBounds(true) // -> para que no salga del borde del juego

        this.characters.forEach(character => {
            this.physics.add.collider(this.people, character, this.triggerDialogue, null, this)
            this.physics.add.collider(character, this.floor)
        })

        this.physics.add.collider(this.people, this.floor)


        this.cursors = this.input.keyboard.createCursorKeys()

        EventBus.emit('current-scene-ready', this);
    }

    changeScene() {
        this.scene.start('Game');
    }


    update() {
        // Movimiento en el eje X
        if (this.cursors.left.isDown) {
            this.people.x -= 2;
            this.people.anims.play('people-walk-left', true); // Animación para caminar a la izquierda
        } else if (this.cursors.right.isDown) {
            this.people.x += 2;
            this.people.anims.play('people-walk-right', true); // Animación para caminar a la derecha
        }

        // Movimiento en el eje Y
        if (this.cursors.up.isDown) {
            this.people.y -= 2;
            this.people.anims.play('people-walk-up', true); // Animación para caminar hacia arriba
        } else if (this.cursors.down.isDown) {
            this.people.y += 2;
            this.people.anims.play('people-walk-down', true); // Animación para caminar hacia abajo
        }

        // Si no se presionan teclas, detener la animación
        if (!this.cursors.left.isDown && !this.cursors.right.isDown && !this.cursors.up.isDown && !this.cursors.down.isDown) {
            this.people.anims.stop();
        }
    }

    triggerDialogue(mainCharacter, character) {
        // Encontrar el diálogo del personaje colisionado
        const dialogueData = dialogues.find(dialogue => dialogue.actor === character.name);

        if (dialogueData) {
            // Renderizar o mostrar el diálogo en la interfaz de React
            EventBus.emit('show-dialogue', dialogueData)
            // this.showDialogue(dialogueData.messagesOrDialogues[0].dialogue);
            // this.showDialogue(dialogueData.messagesOrDialogues[0].dialogue, character.texture.key);
            this.showDialogue(dialogueData);
        }
    }

    showDialogue(dialogueData) {
        this.dialogueText.setText(dialogueData.messagesOrDialogues[0].dialogue);
        this.dialogueBox.setVisible(true);
        this.dialogueText.setVisible(true);
        // this.mainCharacterSprite.setVisible(true);
        this.dialogueCharacter.setVisible(true);
        this.continueButton.setVisible(true);
    }

    hideDialogue() {
        this.dialogueBox.setVisible(false);
        this.dialogueText.setVisible(false);
        this.mainCharacterSprite.setVisible(false);
        this.dialogueCharacter.setVisible(false);
        this.continueButton.setVisible(false);
    }

}
