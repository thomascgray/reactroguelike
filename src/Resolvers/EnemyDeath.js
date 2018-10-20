import _ from 'lodash';

export default function (enemy) {
    console.log('killing an enemy');
    _.remove(window.stageObjects, e => e.HasId.getId() === enemy.HasId.getId());
}