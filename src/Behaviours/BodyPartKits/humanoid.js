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
        holdCapacity: 1,
        wearCapacity: 9,
    },
    "right hand" : {
        types: ['gripPrimary', 'canGrip', 'canWear', 'hand'],
        isHolding: [],
        isWearing: [],
        holdCapacity: 1,
        wearCapacity: 9,
    },
    "left arm" : {
        types: ['canWear', 'arm'],
        isWearing: [],
        wearCapacity: 9,
    },
    "right arm" : {
        types: ['canWear', 'arm'],
        isWearing: [],
        wearCapacity: 9,
    },
    "left foot" : {
        types: ['canWear', 'foot'],
        isWearing: [],
        wearCapacity: 9,
    },
    "right foot" : {
        types: ['canWear', 'foot'],
        isWearing: [],
        wearCapacity: 9,
    },
    "left leg" : {
        types: ['canWear', 'leg'],
        isWearing: [],
        wearCapacity: 9,
    },
    "right leg" : {
        types: ['canWear', 'leg'],
        isWearing: [],
        wearCapacity: 9,
    },
    "head" : {
        types: ['canWear', 'head'],
        isWearing: [],
        wearCapacity: 9,
    },
    "body" : {
        types: ['canWear', 'body'],
        isWearing: [],
        wearCapacity: 9,
    },
}