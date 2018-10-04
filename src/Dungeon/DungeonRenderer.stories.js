import React from 'react';

import { storiesOf } from '@storybook/react';
import { generate } from '../DungeonGenerator/DungeonGenerator'
import { generate as gertyGenerate } from '../DungeonGenerator/Gerty'
import DungeonRenderer from './DungeonRenderer'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

const stories = storiesOf('Dungeon Renderer', module);

stories.addDecorator(withKnobs);

stories
    .add('type rooms: with no rooms', () => {
        const dungeonTemplate = {
            width: number('width', 20),
            height: number('height', 20),
            type: 'rooms',
            rooms: [],
        }
        const dungeon = generate(dungeonTemplate);
        return <DungeonRenderer dungeon={dungeon} />
    })
    .add('type: rooms, with small room(s)', () => {
        const dungeonTemplate = {
            width: 20,
            height: 20,
            type: 'rooms',
            rooms: [
                {
                    count: number('room count', 1),
                    size: 'sm',
                }
            ],
        }
        const dungeon = generate(dungeonTemplate);
        return <DungeonRenderer dungeon={dungeon} />
    })
    .add('type: rogue', () => {
        const dungeonTemplate = {
            width: number('width', 20),
            height: number('height', 20),
            type: 'rogue',
            rogue: {
                rows: number('rows', 2),
                columns: number('columns', 2),
            }
        }
        const dungeon = generate(dungeonTemplate);
        return <DungeonRenderer dungeon={dungeon} />
    })
    .add('type: isaacdungeon', () => {
        const dungeonTemplate = {
            width: number('width', 50),
            height: number('height', 50),
            type: 'isaacdungeon',
            isaacdungeon: {
                roomCount: 2
            },
        }
        const dungeon = generate(dungeonTemplate);
        return <DungeonRenderer dungeon={dungeon} />
    })
    .add('gerty', () => {
        const dungeonTemplate = {
            sectionWidth: 15,
            sectionHeight: 15,
        }
        const dungeon = gertyGenerate(dungeonTemplate);
        return <DungeonRenderer dungeon={dungeon} />
    })
