import React from 'react';

import { storiesOf } from '@storybook/react';
import { generate } from '../DungeonGenerator/DungeonGenerator'
import DungeonRenderer from './DungeonRenderer'

storiesOf('Dungeon Renderer', module)
    .add('with no rooms', () => {
        const dungeonTemplate = {
            width: 20,
            height: 20,
            rooms: [],
        }
        const dungeon = generate(dungeonTemplate);
        return <DungeonRenderer dungeon={dungeon} />
    })
    .add('with 3 small rooms', () => {
        const dungeonTemplate = {
            width: 20,
            height: 20,
            rooms: [
                {
                    count: 1,
                    size: 'sm',
                }
            ],
        }
        const dungeon = generate(dungeonTemplate);
        return <DungeonRenderer dungeon={dungeon} />
    })
