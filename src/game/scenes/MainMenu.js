import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { actors, dialogues, scenes } from '../../data/data';
import { centerBackground } from '../centerBackgrounds';
import { narratorDialogues } from '../../data/narrador';

export class MainMenu extends Scene {

    constructor() {
        super('MainMenu');
        this.dialogueInProgress = false; // Variable para controlar si un diálogo está en progreso
    }

    create() {
        this.sound.add('inicio', { volume: 0.2 }).play()
        // Cargar la imagen de fondo
        centerBackground(this, 'background');

        this.floor = this.add.tileSprite(0, 400 - 32, 600, 32, 'floor');
        this.floor.setOrigin(0, 0);
        this.showGameNarrator("Inicio");

        // Crear un grupo estático para las plataformas
        this.platforms = this.physics.add.staticGroup();

        // Crear el sprite del carro en su tamaño original
        const car = this.physics.add.sprite(150, 80, 'car').setOrigin(0.5, 0.5).setGravity(0);

        // Reducir el tamaño del sprite a 32x32 píxeles
        const originalWidth = 250; // Ancho original del sprite
        const originalHeight = 128; // Alto original del sprite
        const targetWidth = 60; // Ancho deseado
        const targetHeight = 60; // Alto deseado

        // Calcular los factores de escala
        const scaleX = targetWidth / originalWidth;
        const scaleY = targetHeight / originalHeight;

        // Aplicar el menor factor de escala para mantener la proporción
        const scaleFactor = Math.min(scaleX, scaleY);

        car.setScale(scaleFactor);
        // Crear dos plataformas adicionales
        this.platforms.create(200, 300, 'floor').setOrigin(0, 0).setScale().refreshBody(); // Plataforma en el medio
        this.platforms.create(350, 200, 'floor').setOrigin(0, 0).setScale(1).refreshBody(); // Plataforma superior
        this.platforms.create(150, 100, 'floor').setOrigin(0, 0).setScale(1).refreshBody(); // Plataforma superior
        this.platforms.create(120, 100, 'floor').setOrigin(0, 0).setScale(1).refreshBody(); // Plataforma superior
        // Hacer que el suelo sea estático y colisionable
        this.physics.add.existing(this.floor, true);


        // Crear el cuadro de diálogo en la parte inferior
        this.dialogueBox = this.add.graphics();
        this.dialogueBox.fillStyle(0x000000, 0.7);
        this.dialogueBox.fillRect(50, 320, 500, 100);

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
        this.dialogueCharacter = this.add.sprite(490, 350, null).setOrigin(0.5).setScale(1.5);

        // Ocultar todo inicialmente
        this.dialogueBox.setVisible(false);
        this.dialogueText.setVisible(false);
        this.mainCharacterSprite.setVisible(false);
        this.dialogueCharacter.setVisible(false);


        // Inicializar los personajes con los que se puede interactuar
        this.characters = [];
        this.characters.push(
            this.physics.add.sprite(580, 200, actors.primer_ciego.name,).setName(actors.primer_ciego.name)
        );

        // !ESTE ES EL PERSONAJE PRINCIPAL
        this.people = this.physics.add.sprite(0, 0, 'people')
            .setOrigin(0, 1)
            .setGravity(0)
            .setCollideWorldBounds(true);

        this.physics.add.collider(this.people, this.floor)
        this.physics.add.collider(this.people, this.platforms);

        //Agregando colisiones entre los personajes y el principal    
        this.characters.forEach(character => {
            this.physics.add.collider(this.floor, character);
        });

        


        this.physics.add.collider(this.people, car, this.handleCollision, null, this)
        this.physics.add.collider(this.platforms, car)

        this.cursors = this.input.keyboard.createCursorKeys();
        EventBus.emit('current-scene-ready', this);


    }


    handleCollision(mainCharacter, specificObject) {
        if (specificObject.texture.key === 'car' && !this.dialogueInProgress) {
            this.dialogueInProgress = true; // Evitar que el diálogo se muestre múltiples veces

            // Mostrar el cuadro de diálogo y el texto
            this.dialogueBox.setVisible(true);
            this.dialogueText.setText('Encontraste el carro, continuemos, A mi casa!');
            this.dialogueText.setVisible(true);

            // Mostrar los personajes en el cuadro de diálogo
            // this.mainCharacterSprite.setVisible(true);
            this.dialogueCharacter.setVisible(true); // Puedes cambiar el sprite si es necesario

            // Crear un botón de "Continuar"
            const continueButton = this.add.text(300, 360, 'Continuar', {
                fontFamily: 'Arial',
                fontSize: 18,
                color: '#ffffff',
                backgroundColor: '#000000',
                padding: { x: 10, y: 5 }
            }).setInteractive();

            continueButton.on('pointerdown', () => {
                // Ocultar el diálogo y continuar
                this.dialogueBox.setVisible(false);
                this.dialogueText.setVisible(false);
                this.mainCharacterSprite.setVisible(false);
                this.dialogueCharacter.setVisible(false);
                continueButton.destroy(); // Destruir el botón después de usarlo

                // Emitir un evento de cambio de escena
                this.scene.start('CasaPrimerCiego')
            });
        }
    }

    triggerDialogue(mainCharacter, character) {
        if (!this.dialogueInProgress) {
            this.dialogueInProgress = true;
            const dialogueData = dialogues.find(dialogue => dialogue.actor === character.name);

            if (dialogueData) {
                this.currentDialogueIndex = 0;
                this.currentResponseIndex = 0;
                this.activeDialogueData = dialogueData;

                this.dialogueCharacter.setTexture(character.texture.key);
                this.dialogueCharacter.setVisible(true);

                this.currentSceneDialogues = dialogueData.messagesOrDialogues.find(dialogues => dialogues.scene === scenes.primera_escena.name);

                if (this.currentSceneDialogues) {
                    this.currentSceneDialogues.dialogues = this.currentSceneDialogues.dialogues || [];
                    this.showDialogue();
                } else {
                    console.log('No hay diálogos para esta escena.');
                    this.dialogueInProgress = false;
                }
            } else {
                console.log('No se encontró un diálogo para el personaje especificado.');
                this.dialogueInProgress = false;
            }
        }
    }

    showDialogue() {
        if (this.currentSceneDialogues && this.currentSceneDialogues.dialogues.length > 0) {
            const dialogue = this.currentSceneDialogues.dialogues[this.currentDialogueIndex];

            if (dialogue) {

                // Ocultar los personajes y desactivar la entrada del jugador
                this.people.setVisible(false);
                this.characters.forEach(character => character.setVisible(false));
                this.cursors.left.enabled = false;
                this.cursors.right.enabled = false;
                this.cursors.up.enabled = false;
                this.cursors.down.enabled = false;

                this.dialogueText.setText(dialogue);
                this.dialogueBox.setVisible(true);
                this.dialogueText.setVisible(true);
                this.mainCharacterSprite.setVisible(true);

                this.time.delayedCall(3000, () => {
                    this.respondToDialogue();
                });
            } else {
                console.log('No hay más diálogos.');
                this.dialogueInProgress = false;
            }
        } else {
            console.log('No hay diálogos disponibles para esta escena.');
            this.dialogueInProgress = false;
        }
    }

    respondToDialogue() {
        const responses = [
            "Claro, ¿cómo te ayudo?",
            "Entendido, buscaré el carro."
        ];

        if (this.currentResponseIndex < responses.length) {
            const response = responses[this.currentResponseIndex];
            this.dialogueText.setText(response);
            this.time.delayedCall(3000, () => {
                this.currentResponseIndex++;
                this.currentDialogueIndex++;
                if (this.currentDialogueIndex < this.currentSceneDialogues.dialogues.length) {
                    this.showDialogue();
                } else {
                    this.endDialogue();
                }
            });
        } else {
            this.endDialogue();
        }
    }

    endDialogue() {
        // Mostrar nuevamente los personajes y reactivar la entrada del jugador
        this.people.setVisible(true);
        this.characters.forEach(character => character.setVisible(true));
        this.cursors.left.enabled = true;
        this.cursors.right.enabled = true;
        this.cursors.up.enabled = true;
        this.cursors.down.enabled = true;

        this.dialogueBox.setVisible(false);
        this.dialogueText.setVisible(false);
        this.mainCharacterSprite.setVisible(false);
        this.dialogueCharacter.setVisible(false);
        this.currentDialogueIndex = 0;
        this.currentResponseIndex = 0;
        this.dialogueInProgress = false; // Permite que un nuevo diálogo pueda ser iniciado
    }

    showGameNarrator(scene) {
        this.instructionBox = this.add.graphics();
        this.instructionBox.fillStyle(0x000000, 0.7); // Color negro con 70% de opacidad
        this.instructionBox.fillRect(50, 30, 500, 80); // Cuadro de instrucciones en la parte superior

        const dialogs = narratorDialogues.find(narrator => narrator.scene === scene);

        this.instructionText = this.add.text(60, 30, dialogs.dialogues[0], {
            fontFamily: 'Arial',
            fontSize: 18,
            color: '#ffffff',
            wordWrap: { width: 480, useAdvancedWrap: true }
        });

        this.instructionBox.setVisible(true);
        this.instructionText.setVisible(true);

        // Mostrar cada diálogo con un retraso
        let dialogueIndex = 0;
        const showNextDialogue = () => {
            dialogueIndex++;
            if (dialogueIndex < dialogs.dialogues.length) {
                this.instructionText.setText(dialogs.dialogues[dialogueIndex]);
                this.time.delayedCall(3000, showNextDialogue);
            } else {
                // Ocultar el cuadro de narrador después de terminar
                this.instructionBox.setVisible(false);
                this.instructionText.setVisible(false);

                // Iniciar el diálogo entre el mainCharacter y el primer personaje
                const firstCharacter = this.characters[0]; // Suponiendo que solo hay un personaje al inicio
                this.triggerDialogue(this.people, firstCharacter);
            }
        };

        this.time.delayedCall(3000, showNextDialogue); // Mostrar el primer diálogo después de 3 segundos
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
        if (this.cursors.up.isDown && this.people.body.touching.down) {
            this.people.setVelocityY(-300);
            this.people.anims.play('people-walk-up', true);
        }

        // Detener la animación si no se presionan teclas
        if (!this.cursors.left.isDown && !this.cursors.right.isDown && !this.cursors.up.isDown && !this.cursors.down.isDown) {
            this.people.anims.stop();
        }
    }

}
