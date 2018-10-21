import _ from 'lodash';
import CastPowerOnEnemy from './CastPowerOnEnemy'

export default function (power) {
    const hitObjects = []
    power.tiles.forEach(tile => {
        window.stageObjects.forEach(stageObject => {
            if (_.isEqual(stageObject.HasPosition.getPosition(), { x: tile.x, y: tile.y })) {
                hitObjects.push(_.cloneDeep(stageObject));
            }
        });
    });

    hitObjects.forEach(obj => {
        if (obj.constructor.name === 'EnemyEntity') {
            CastPowerOnEnemy(obj, power);
        }
    })
}