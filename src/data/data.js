export const scenes = {
    primera_escena: {
        id: 1,
        name: "primera-escena"
    },
    consultorio_del_oftalmologo: {
        id: 2,
        name: "consultorio-del-oftalmologo"
    },
    en_casa_despues_de_la_ceguera: {
        id: 3,
        name: "en-casa-despues-de-la-ceguera"
    },
    en_el_manicomio: {
        id: 4,
        name: "en-el-manicomio"
    },
    antes_de_llegar_al_manicomio: {
        id: 5,
        name: "antes-de-llegar-al-manicomio"
    },
    despues_de_escapar_del_manicomio: {
        id: 6,
        name: "despues-de-escapar-del-manicomio"
    }
};

export const actors = {
    primer_ciego: {
        id: 1,
        name: "primer-ciego"
    },
    esposa_del_primer_ciego: {
        id: 2,
        name: "esposa-del-primer-ciego"
    },
    medico_oftalmologo: {
        id: 3,
        name: "medico-oftalmologo"
    },
    esposa_del_medico: {
        id: 4,
        name: "esposa-del-medico"
    },
    chica_de_las_gafas_oscuras: {
        id: 5,
        name: "chica-de-las-gafas-oscuras"
    },
    viejo_con_el_parche_en_el_ojo: {
        id: 6,
        name: "viejo-con-el-parche-en-el-ojo"
    },
    hombre_de_la_venda_negra: {
        id: 7,
        name: "hombre-de-la-venda-negra"
    }
};


export const dialogues = [
    {
        "actor": actors.primer_ciego.name, // "primer-ciego"
        "messagesOrDialogues": [
            {
                "scene": scenes.primera_escena.name, // "primera-escena"
                "dialogues": [
                    "¡Estoy ciego, no veo nada! Solo hay una luz blanca, como una niebla espesa.",
                    "Ayúdame! A encontrar mi carro para poder ir con mi esposa"
                ]
            },
            {
                "scene": scenes.consultorio_del_oftalmologo.name, // "consultorio-del-oftalmologo"
                "dialogues": [
                    "No hay nada que pueda ver, doctor. Es como si estuviera atrapado en una nube blanca."
                ]
            }
        ]
    },
    {
        "actor": actors.esposa_del_primer_ciego.name, // "esposa-del-primer-ciego"
        "messagesOrDialogues": [
            {
                "scene": scenes.en_casa_despues_de_la_ceguera.name, // "en-casa-despues-de-la-ceguera"
                "dialogues": [
                    "Tranquilo, todo va a estar bien. Te llevaré a casa, no te preocupes."
                ]
            },
            {
                "scene": scenes.en_el_manicomio.name, // "en-el-manicomio"
                "dialogues": [
                    "Estamos todos ciegos aquí... Es como si hubiéramos sido olvidados por el mundo."
                ]
            }
        ]
    },
    {
        "actor": actors.medico_oftalmologo.name, // "medico-oftalmologo"
        "messagesOrDialogues": [
            {
                "scene": scenes.consultorio_del_oftalmologo.name, // "consultorio-del-oftalmologo"
                "dialogues": [
                    "No entiendo cómo es posible, pero la ceguera de usted no tiene ninguna causa física aparente."
                ]
            },
            {
                "scene": scenes.en_el_manicomio.name, // "en-el-manicomio"
                "dialogues": [
                    "Debemos organizarnos, no podemos perder la humanidad, incluso en esta oscuridad."
                ]
            }
        ]
    },
    {
        "actor": actors.esposa_del_medico.name, // "esposa-del-medico"
        "messagesOrDialogues": [
            {
                "scene": scenes.antes_de_llegar_al_manicomio.name, // "antes-de-llegar-al-manicomio"
                "dialogues": [
                    "No te dejaré solo en esto, aunque digan que no puedo entrar contigo."
                ]
            },
            {
                "scene": scenes.en_el_manicomio.name, // "en-el-manicomio"
                "dialogues": [
                    "Veo lo que está sucediendo, pero debo fingir que no veo nada para protegernos."
                ]
            },
            {
                "scene": scenes.despues_de_escapar_del_manicomio.name, // "despues-de-escapar-del-manicomio"
                "dialogues": [
                    "La ciudad está en ruinas... ¿Qué nos ha pasado?"
                ]
            }
        ]
    },
    {
        "actor": actors.chica_de_las_gafas_oscuras.name, // "chica-de-las-gafas-oscuras"
        "messagesOrDialogues": [
            {
                "scene": scenes.en_el_manicomio.name, // "en-el-manicomio"
                "dialogues": [
                    "Éramos personas civilizadas, ahora somos solo animales, luchando por sobrevivir."
                ]
            },
            {
                "scene": scenes.despues_de_escapar_del_manicomio.name, // "despues-de-escapar-del-manicomio"
                "dialogues": [
                    "No pensé que volveríamos a ver la luz del día... ¿Qué hacemos ahora?"
                ]
            }
        ]
    },
    {
        "actor": actors.viejo_con_el_parche_en_el_ojo.name, // "viejo-con-el-parche-en-el-ojo"
        "messagesOrDialogues": [
            {
                "scene": scenes.en_el_manicomio.name, // "en-el-manicomio"
                "dialogues": [
                    "En este lugar, la ceguera no es lo peor. Lo peor es lo que nos estamos haciendo unos a otros."
                ]
            }
        ]
    },
    {
        "actor": actors.hombre_de_la_venda_negra.name, // "hombre-de-la-venda-negra"
        "messagesOrDialogues": [
            {
                "scene": scenes.en_el_manicomio.name, // "en-el-manicomio"
                "dialogues": [
                    "Si quieren comida, deben pagar por ella. Aquí, el poder lo tengo yo."
                ]
            }
        ]
    }
];
