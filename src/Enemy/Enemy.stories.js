import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs';
import Enemy from './Enemy'
import EnemyRenderer from './EnemyRenderer'

const stories = storiesOf('Enemy', module);

stories.addDecorator(withKnobs);

stories
    .add('enemy renderer', () => {
        const enemy = new Enemy({
            position: {
                x: 2,
                y: 2,
            },
            hp: number('enemy hp', 10), 
            archetype: select('enemy archetype', ['skeleton', 'goblin'], 'skeleton')
        });

        return <div>
            <EnemyRenderer enemy={enemy} />
        </div>
    })

