const attachFunctions = (object, behaviours) => {
    behaviours.forEach(behaviour => {
        object[behaviour.constructor.name] = {}
        Object.keys(behaviour.functions).forEach(f => {
            object[behaviour.constructor.name][f] = behaviour.functions[f]
        })
      });
}

const toState = behaviours => {
    const state = {}

    behaviours.forEach(behaviour => {
      state[behaviour.constructor.name] = behaviour.toState();
    });

    return state;
}

export {
    attachFunctions,
    toState
}