/**
 * type dictionary
 * 
 * gripPrimary
 *  if this body part can grip, gripPrimary means it should appear on your 
 *  character sheet even when its empty. e.g "your left hand is empty"
 * 
 * wearPrimary
 *  if this body part can wear, wearPrimary means it should appear on your 
 *  character sheet even when its bare. e.g "your head is bare"
 * 
 * hand
 *  hands can grip items, and wear hand armour (gloves)
 * 
 * arm
 *  arms can wear arm armour (abstraction for shoulder armour?)
 * 
 * leg
 *  legs can wear leg armour (trousers)
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

 /**
  * attributes
  * 
  * types
  *  as listed above, the various types this body part is
  * 
  * isHolding
  *  array of things that this body part is holding. only body parts that canGrip should be holding things
  * 
  * isWearing
  *  array of things that this body part is wearing. only body parts that canWear should be wearing things
  */

export default {
    "left hand" : {
        types: ['gripPrimary', 'canGrip', 'canWear', 'hand'],
        isHolding: [],
        isWearing: [],
    },
    "right hand" : {
        types: ['gripPrimary', 'canGrip', 'canWear', 'hand'],
        isHolding: [],
        isWearing: [],
    },
    "left arm" : {
        types: ['canWear', 'arm'],
        isWearing: [],
    },
    "right arm" : {
        types: ['canWear', 'arm'],
        isWearing: [],
    },
    "left foot" : {
        types: ['canWear', 'foot'],
        isWearing: [],
    },
    "right foot" : {
        types: ['foot'],
        isWearing: [],
    },
    "left leg" : {
        types: ['canWear', 'leg'],
        isWearing: [],
    },
    "right leg" : {
        types: ['canWear', 'leg'],
        isWearing: [],
    },
    "head" : {
        types: ['canWear', 'head'],
        isWearing: [],
    },
    "body" : {
        types: ['canWear', 'body'],
        isWearing: [],
    },
}