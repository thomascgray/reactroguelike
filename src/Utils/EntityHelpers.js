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
        entity[behaviour.constructor.name] = behaviour;
    })
}

const attachEmitter = (entity) => {
    entity.emitter = mitt();
    return entity;
}

const attachProperty = (behaviour, entity, propertyName, propertyDefaultValue) => {
    const internalPropertyName = `_${propertyName}`;

    behaviour[internalPropertyName] = _.cloneDeep(propertyDefaultValue);

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
    entity.emitter = mitt();
    attachBehaviours(entity, behaviours)
    return entity;
}

export {
    attachBehaviours,
    toState,
    attachEmitter,
    attachProperty,
    composeEntity
}