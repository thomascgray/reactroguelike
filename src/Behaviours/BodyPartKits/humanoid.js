/**
 * type dictionary
 * 
 * primary
 *  means it should appear on your character sheet even when its empty. e.g "your left hand is empty"
 * 
 * hand
 *  hands can grip items, and wear hand armour (gloves)
 * 
 * arm
 *  arms can wear arm armour
 * 
 * leg
 *  legs can wear leg armour
 * 
 * foot
 *  feet can wear feet armour (shoes)
 * 
 * head
 *  heads can wear head armour (hats)
 * 
 * body
 *  bodies can wear cloaks/capes
 */

export default {
    "left hand" : {
        types: ['primary', 'hand'],
    },
    "right hand" : {
        types: ['primary', 'hand'],
    },
    "left arm" : {
        types: ['arm'],
    },
    "right arm" : {
        types: ['arm'],
    },
    "left foot" : {
        types: ['foot'],
    },
    "right foot" : {
        types: ['foot'],
    },
    "left leg" : {
        types: ['leg'],
    },
    "right leg" : {
        types: ['leg'],
    },
    "head" : {
        types: ['head'],
    },
    "body" : {
        types: ['body'],
    },
}