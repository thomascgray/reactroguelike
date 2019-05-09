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
            x: number('x position', 2),
            y: number('y position', 2),
        },
        hp: number('hp', 10), 
        archetype: 'goblin'
    });

    return (<EnemyRenderer enemy={enemy} />)
});

