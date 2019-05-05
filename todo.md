we want all the behaviours to use getters and setters

and in their own setters, determine if a stateChange should be emitted

and then the renderers can watch for stateChange, and call a forceUpdate()

things to do;

- maybe one helper function that does all the magic (instead of attachBehaviours, attachEmitter, etc.)

- helper func to wire up new properties so we dont have to manually write the setter and getter each time