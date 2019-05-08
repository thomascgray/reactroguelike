import React from 'react';

import { storiesOf } from '@storybook/react';
import DungeonRenderer from '../Dungeon/DungeonRenderer'
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs';
import PowersPrepAreaOfEffectRenderer from '../Powers/PowersPrepAreaOfEffectRenderer'
import Player from '../Player/Player'

import { preparePower } from '../Utils/Powers'

const stories = storiesOf('Powers', module);

stories.addDecorator(withKnobs);

stories
    .add('area of effect', () => {
        const map = [
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0]
        ]

        const power = {
            type: 'areaOfEffect',
            range: number('range', 2),
            shape: select('shape', ['square', 'circle'], 'square'),
            source: 'player',
        }

        window.player = new Player({
            position: {
                x: number('player position x', 2),
                y: number('player position y', 2)
            },
        });
        
        return <div>
            <DungeonRenderer dungeon={{
                map
            }} />
            <PowersPrepAreaOfEffectRenderer power={preparePower(power)} />
        </div>
    })

