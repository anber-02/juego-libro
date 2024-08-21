import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { actors } from '../../data/data';
import { centerBackground } from '../centerBackgrounds';
import { narratorDialogues } from '../../data/narrador';

export class Consultorio extends Scene {

    constructor() {
        super('Consultorio');
        this.dialogueInProgress = false; // Variable para controlar si un diálogo está en progreso
    }

    create() {
        // Cargar la imagen de fondo
        centerBackground(this, 'background-3');
        this.showGameNarrator("Consultorio");




        this.cursors = this.input.keyboard.createCursorKeys();
        EventBus.emit('current-scene-ready', this);
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

                this.loadCharacters()
            }
        };

        this.time.delayedCall(3000, showNextDialogue); // Mostrar el primer diálogo después de 3 segundos
    }

    loadCharacters() {
        this.characters = [];
        this.characters.push(
            this.physics.add.sprite(580, 200, actors.primer_ciego.name,).setName(actors.primer_ciego.name),
            this.physics.add.sprite(580, 200, actors.esposa_del_primer_ciego.name,).setName(actors.esposa_del_primer_ciego.name),
            this.physics.add.sprite(580, 200, actors.medico_oftalmologo.name,).setName(actors.medico_oftalmologo.name)
        );

        // !ESTE ES EL PERSONAJE PRINCIPAL
        this.people = this.physics.add.sprite(0, 0, 'people')
            .setOrigin(0, 1)
            .setGravity(0)
            .setCollideWorldBounds(true);
    }
}
