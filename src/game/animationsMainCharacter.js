export function animationsMainCharacter(game) {
    // Creando animaciones para people
    // Animación para caminar hacia abajo (primera columna)
    game.anims.create({
        key: 'people-walk-down',
        frames: game.anims.generateFrameNumbers('people', { frames: [0, 4, 8, 12] }),
        frameRate: 10,
        repeat: -1
    });

    // Animación para caminar hacia la izquierda (segunda columna)
    game.anims.create({
        key: 'people-walk-left',
        frames: game.anims.generateFrameNumbers('people', { frames: [1, 5, 9, 13] }),
        frameRate: 10,
        repeat: -1
    });

    // Animación para caminar hacia arriba (tercera columna)
    game.anims.create({
        key: 'people-walk-up',
        frames: game.anims.generateFrameNumbers('people', { frames: [2, 6, 10, 14] }),
        frameRate: 10,
        repeat: -1
    });

    // Animación para caminar hacia la derecha (cuarta columna)
    game.anims.create({
        key: 'people-walk-right',
        frames: game.anims.generateFrameNumbers('people', { frames: [3, 7, 11, 15] }),
        frameRate: 10,
        repeat: -1
    });

}