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




    const currentScene = (scene) => {

        setCanMoveSprite(scene.scene.key !== 'MainMenu');

    }

    const goBackScene = () => {
        const scene = phaserRef.current.scene;
        if (scene) {
            scene.goBackScene();
        }
    };
    const resetGame = () => {
        const gameInstance = phaserRef.current?.scene;
        if (gameInstance) {
            gameInstance.scene.stop(gameInstance.scene.key); 
            gameInstance.scene.start('MainMenu'); 
        }
    };

    return (
        <div id="app" className="flex flex-col p-4">
            {/* Frame del juego */}
            <div className="w-3/4 p-4 flex space-x-6 justify-between items-start">
                <div className='bg-gray-800 w-1/3 p-4 rounded-md shadow-md'>
                    <h2 className="text-lg font-bold text-white mb-2">Instrucciones 📝</h2>
                    <ul className='list-disc list-inside text-white grid gap-3 italic'>
                        <li>Mueve al personaje con las flechas de tu ordenador</li>
                        <li>Sigue la historia y realiza las acciones que te pidan los personajes</li>
                        <li>En cada escenario las cosas serán diferentes. Estate atento 🤗</li>
                    </ul>
                </div>
                <div className="bg-gray-800 rounded-md shadow-md h-full flex items-center justify-center">
                    <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
                </div>
                {/* Cargar opciones para el juego */}
                <div className="ml-4">
                    <h2 className="text-xl font-bold mb-2 uppercase">Opciones</h2>
                    <div className='grid gap-8'>
                        <button
                            onClick={goBackScene}
                            className="middle none center mr-4 rounded-lg bg-slate-800 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        >
                            Retroceder Escena
                        </button>
                        <button
                            onClick={resetGame}
                            className="middle none center mr-4 rounded-lg bg-slate-800 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        >
                            Reiniciar Juego
                        </button>
                    </div>
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
            </div>
        </div>
    );

}

export default App
