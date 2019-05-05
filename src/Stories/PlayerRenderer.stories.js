import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs';
import Player from '../Player/Player'
import PlayerRenderer from '../Player/PlayerRenderer'

const stories = storiesOf('Player', module);

stories.addDecorator(withKnobs);

const player = new Player({
    position: {
        x: 2,
        y: 2,
    },
    archetype: 'druid'
});

document.addEventListener('keyup', e => {
    switch (e.code) {
        case 'KeyW':
            player.HasPosition.moveUp();
            break;
        case 'KeyA':
            player.HasPosition.moveLeft();
            break;
        case 'KeyD':
            player.HasPosition.moveRight();
            break;
        case 'KeyS':
            player.HasPosition.moveDown();
            break;
    }

    console.log('player position', player.HasPosition.getPosition());
});

stories
    .add('player renderer', () => {
        return <div>
            <PlayerRenderer player={player} />
        </div>
    })

