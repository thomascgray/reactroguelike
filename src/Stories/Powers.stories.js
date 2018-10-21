import React from 'react';

import { storiesOf } from '@storybook/react';
import DungeonRenderer from '../Dungeon/DungeonRenderer'
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs';
import { RefreshButton } from './StoryUtils'
import PowersPrepAreaOfEffectRenderer from '../Powers/PowersPrepAreaOfEffectRenderer'

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
            realSource: {
                x: number('real source x', 3),
                y: number('real source y', 3),
                ignoreCentre: boolean('ignore centre', true),
            }
        }
        
        return <div>
            <DungeonRenderer dungeon={{
                map
            }} />
            <PowersPrepAreaOfEffectRenderer power={power} />
            <RefreshButton />
        </div>
    })

