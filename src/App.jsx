import { useEffect, useRef, useState } from 'react';

import { PhaserGame } from './game/PhaserGame';
import { EventBus } from './game/EventBus';

function App() {

    const [dialogue, setDialogue] = useState(null);

    useEffect(() => {
        // Escuchar el evento 'show-dialogue' emitido por Phaser
        const handleDialogue = (dialogueData) => {
            setDialogue(dialogueData);
        };

        EventBus.on('show-dialogue', handleDialogue);

        // Limpieza para evitar fugas de memoria
        return () => {
            EventBus.off('show-dialogue', handleDialogue);
        };
    }, []);


    // The sprite can only be moved in the MainMenu Scene
    const [canMoveSprite, setCanMoveSprite] = useState(true);

    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef();




    // Event emitted from the PhaserGame component
    const currentScene = (scene) => {

        setCanMoveSprite(scene.scene.key !== 'MainMenu');

    }

    return (
        <div id="app" className="flex flex-col p-4">
            {/* Frame del juego */}
            <div className="w-2/3 p-4 flex justify-center items-center">
                <div className="bg-gray-800 rounded-md shadow-md h-full flex items-center justify-center">
                    <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
                </div>
            </div>

            {/* Mostrar el diálogo */}
            {dialogue && (
                <div className="dialogue-box p-4 border rounded">
                    <h2>{dialogue.actor}</h2>
                    <p className='text-sm'>{dialogue.messagesOrDialogues[0].dialogue}</p>
                </div>
            )}

            {/* Descripción del juego */}
            <div className="mt-4 w-3/4 mx-auto bg-slate-800 p-4 rounded-md shadow-md">
                <h2 className="text-lg font-bold mb-2">Descripción del Juego</h2>
                <p>
                    Este juego está basado en la obra <i>"Ensayo sobre la ceguera"</i> de José Saramago. Su objetivo es representar y enseñar cómo se desarrolla la historia del libro a través de la interacción con principal que sera el usuario que este interactuando con el juego.
                </p>
                <h2 className="text-lg font-bold mt-2">Instrucciones</h2>
                <p>El jugador se mueve de izquierda a derecha, encontrando personajes principales que presentan diálogos significativos
                    A medida que avanzas en el juego, debes realizar acciones específicas, como saltar o alcanzar puntos clave, para desbloquear nuevos eventos y progresar en la narrativa...</p>


            </div>
        </div>
    );

}

export default App
