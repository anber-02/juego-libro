export const centerBackground = (game, background) => {
    // Calcular escala para ajustar la imagen de fondo
    const bg = game.add.image(0, 0, background);
    const scaleX = game.cameras.main.width / bg.width;
    const scaleY = game.cameras.main.height / bg.height;
    const scale = Math.max(scaleX, scaleY);

    // Escalar y centrar la imagen de fondo
    bg.setScale(scale).setScrollFactor(0).setOrigin(0.5, 0.5);

    // Ajustar la posición de la imagen para que esté centrada en la pantalla
    bg.x = game.cameras.main.width / 2;
    bg.y = game.cameras.main.height / 2;
    bg.setAlpha(0.8);
}