import { actors } from "../../../data/data"

export function loadCharacters(game) {
    game.load.spritesheet(actors.primer_ciego.name, 'characters/man-black.png', {
        frameWidth: 62, frameHeight: 61,
    })
    game.load.spritesheet(actors.esposa_del_primer_ciego.name, 'characters/girl.png', {
        frameWidth: 30, frameHeight: 30,
    })

    // Cargando los assets
    game.load.spritesheet('people', 'characters/main.png', {
        frameWidth: 48, frameHeight: 48

    })

    game.load.spritesheet(actors.medico_oftalmologo.name, 'characters/doctor.png', {
        frameWidth: 62, frameHeight: 63
    })
}