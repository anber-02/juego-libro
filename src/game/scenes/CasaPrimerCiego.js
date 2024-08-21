import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { actors, dialogues as dataDialogues } from '../../data/data';
import { centerBackground } from '../centerBackgrounds';
import { narratorDialogues } from '../../data/narrador';

export class CasaPrimerCiego extends Scene {

    constructor() {
        super('CasaPrimerCiego');
    }

    create() {
        this.currentScene = 'en-casa-despues-de-la-ceguera';
        // Cargar la imagen de fondo
        centerBackground(this, 'background-2');

        this.floor = this.add.tileSprite(0, 400 - 32, 600, 32, 'floor');
        this.floor.setOrigin(0, 0);
        this.showGameNarrator("Casa-ciego");


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

        // Personajes para el diálogo
        this.dialogueCharacterLeft = this.add.sprite(60, 350, null).setOrigin(0.5).setScale(1.5);
        this.dialogueCharacterRight = this.add.sprite(490, 350, null).setOrigin(0.5).setScale(1.5);

        // Ocultar todo inicialmente
        this.dialogueBox.setVisible(false);
        this.dialogueText.setVisible(false);
        this.dialogueCharacterLeft.setVisible(false);
        this.dialogueCharacterRight.setVisible(false);


        // Inicializar los personajes con los que se puede interactuar
        this.characters = [];
        this.characters.push(
            this.add.sprite(this.scale.width / 2, this.scale.height / 2, actors.primer_ciego.name, 2).setName(actors.primer_ciego.name),
            this.add.sprite(this.scale.width / 2 + 30, this.scale.height / 2, actors.esposa_del_primer_ciego.name).setName(actors.esposa_del_primer_ciego.name).setScale(1)
        );




        //Agregando colisiones entre los personajes y el principal    
        this.characters.forEach(character => {
            this.physics.add.collider(this.floor, character);
        });



        this.cursors = this.input.keyboard.createCursorKeys();

        EventBus.emit('current-scene-ready', this);


    }


    endDialogue() {
        // Mostrar nuevamente los personajes y reactivar la entrada del jugador
        this.characters.forEach(character => character.setVisible(true));
        this.cursors.left.enabled = true;
        this.cursors.right.enabled = true;
        this.cursors.up.enabled = true;
        this.cursors.down.enabled = true;


        this.dialogueCharacterLeft.setVisible(false);
        this.dialogueCharacterRight.setVisible(false);

        this.dialogueBox.setVisible(false);
        this.dialogueText.setVisible(false);
        this.currentDialogueIndex = 0;
        this.currentResponseIndex = 0;
        this.dialogueInProgress = false; // Permite que un nuevo diálogo pueda ser iniciado



        // Mostrar el cuadro de diálogo y el texto
        this.dialogueBox.setVisible(true);
        this.dialogueText.setText('Vamos al hospital. A continuar con la historia');
        this.dialogueText.setVisible(true);

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
            this.dialogueCharacterRight.setVisible(true);
            continueButton.destroy(); // Destruir el botón después de usarlo

            // Emitir un evento de cambio de escena
            this.scene.start('Consultorio')
        });
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

                // Iniciar el diálogo entre los personajes
                this.showCharacterDialogues();
            }
        };

        this.time.delayedCall(3000, showNextDialogue); // Mostrar el primer diálogo después de 3 segundos
    }

    showCharacterDialogues() {

        this.characters.forEach(character => character.setVisible(false));
    
        // Selecciona los personajes para el diálogo
        const character1 = this.characters[0].texture.key;
        const character2 = this.characters[1].texture.key;
    
        // Encuentra los diálogos correspondientes a la escena actual y los actores
        const dialogueData1 = dataDialogues.find(d => d.actor === character1);
        const dialogueData2 = dataDialogues.find(d => d.actor === character2);
    
        if (!dialogueData1 || !dialogueData2) {
            console.error(`No se encontraron diálogos para uno o ambos personajes.`);
            this.endDialogue();
            return;
        }
    
        const sceneDialogues1 = dialogueData1.messagesOrDialogues.find(m => m.scene === this.currentScene);
        const sceneDialogues2 = dialogueData2.messagesOrDialogues.find(m => m.scene === this.currentScene);
    
        if (!sceneDialogues1 || !sceneDialogues2) {
            console.error(`No se encontraron diálogos para la escena "${this.currentScene}"`);
            this.endDialogue();
            return;
        }
    
        // Prepara los diálogos
        const dialogues1 = sceneDialogues1.dialogues;
        const dialogues2 = sceneDialogues2.dialogues;
    
        this.dialogueCharacterLeft.setTexture(character1);
        this.dialogueCharacterRight.setTexture(character2);
    
        this.dialogueBox.setVisible(true);
        this.dialogueText.setVisible(true);
        this.dialogueCharacterLeft.setVisible(true);
        this.dialogueCharacterRight.setVisible(true);
    
        let index1 = 0;
        let index2 = 0;
        let isCharacter1Turn = true;
    
        const showNextDialogue = () => {
            if (index1 < dialogues1.length || index2 < dialogues2.length) {
                if (isCharacter1Turn && index1 < dialogues1.length) {
                    this.dialogueText.setStyle({ align: 'left' }); // Justificado a la izquierda
                    this.dialogueText.setText(dialogues1[index1]);
                    index1++;
                } else if (!isCharacter1Turn && index2 < dialogues2.length) {
                    this.dialogueText.setStyle({ align: 'right' }); // Justificado a la derecha
                    this.dialogueText.setText(dialogues2[index2]);
                    index2++;
                }
                isCharacter1Turn = !isCharacter1Turn; // Alterna el turno
    
                this.time.delayedCall(3000, showNextDialogue);
            } else {
                this.endDialogue();
            }
        };
    
        showNextDialogue();
    }
    

    goBackScene() {
        this.scene.start('City');
    }



}
