import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs';
import Player from './Player'
import PlayerRenderer from './PlayerRenderer'

const stories = storiesOf('Player', module);

stories.addDecorator(withKnobs);

stories
    .add('player renderer', () => {
        const player = new Player({
            position: {
                x: 2,
                y: 2,
            },
            hp: number('player hp', 10), 
            archetype: select('player archetype', ['druid', 'witch'], 'druid')
        });

        return <div>
            <PlayerRenderer player={player} />
        </div>
    })

