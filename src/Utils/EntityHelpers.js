import Uuid from 'uuid/v4'
import _ from 'lodash'
import mitt from 'mitt'

/**
 * 
 * @param {object} entity 
 * @param {class[]} behaviours 
 */
const attachBehaviours = (entity, behaviours) => {
    behaviours.forEach(behaviour => {
        // for every behaviour class, make an empty object of the same name on the entity
        entity[behaviour.constructor.name] = {}

        // then for every function in that behaviour...
        Object.keys(behaviour.functions).forEach(funcName => {
            //...attach the function to the entity under the behaviour name
            // as a new function that calls the original behaviour function PLUS
            // some special sauce...
            // entity[behaviour.constructor.name][funcName] = behaviour.functions[funcName]
            // console.log('behaviour.functions[funcName]', behaviour.functions[funcName]);
            entity[behaviour.constructor.name][funcName] = function () {
                // document.dispatchEvent(new CustomEvent(`${entity.constructor.name}:${entity.id}`));
                return behaviour.functions[funcName](...arguments)
            }
        })
      });
}

const attachEmitter = (entity) => {
    entity.emitter = mitt();

    return entity;
}

const attachProperty = (behaviour, entity, propertyName, propertyDefaultValue) => {
    const internalPropertyName = `_${propertyName}`;

    behaviour[internalPropertyName] = propertyDefaultValue;

    Object.defineProperty(behaviour, propertyName, {
        get: function () {
            return behaviour[internalPropertyName]
        },
        set: function(val) {
            if (behaviour[internalPropertyName] !== val) {
                behaviour[internalPropertyName] = val;
                entity.emitter.emit('stateChange')
            }
            return behaviour;
        }
    });

    return behaviour;
}

const toState = (behaviours, className) => {
    const state = {
        className
    }

    behaviours.forEach(behaviour => {
      state[behaviour.constructor.name] = behaviour.toState();
    });

    return state;
}

const composeEntity = ({ entity, behaviours }) => {
    attachEmitter(entity);
    attachBehaviours(entity, behaviours)
}

export {
    attachBehaviours,
    toState,
    attachEmitter,
    attachProperty,
    composeEntity
}