import { Boot } from './scenes/Boot';
import { MainMenu } from './scenes/MainMenu';
import Phaser from 'phaser';
import { Preloader } from './scenes/Preloader';
import { CasaPrimerCiego } from './scenes/CasaPrimerCiego';
import { City } from './scenes/City';
import { Consultorio } from './scenes/Consultorio';

// Find out more information about the Game Config at:
// https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    width: 600,
    height: 400,
    parent: 'game-container',
    backgroundColor: '#028af8',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 }
        }
    },

    scene: [
        Boot,
        Preloader,
        MainMenu,
        CasaPrimerCiego,
        Consultorio,
        City
    ]
};

const StartGame = (parent) => {

    return new Phaser.Game({ ...config, parent });

}

export default StartGame;
