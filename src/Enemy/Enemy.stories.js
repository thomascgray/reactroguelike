import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import Enemy from './Enemy'
import EnemyRenderer from './EnemyRenderer'

const stories = storiesOf('Enemy', module);

stories.addDecorator(withKnobs);

stories.add('render', () => {
    const enemy = new Enemy({
        position: {
            x: 2,
            y: 2,
        },
        hp: 10, 
        archetype: 'goblin'
    });

    return (<EnemyRenderer enemy={enemy} />)
});

