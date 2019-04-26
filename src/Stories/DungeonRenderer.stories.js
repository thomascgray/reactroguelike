import React from 'react';

import { storiesOf } from '@storybook/react';
import { generate as gertyGenerate } from '../DungeonGenerator/Gerty'
import DungeonRenderer from '../Dungeon/DungeonRenderer'
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs';
import { RefreshButton } from './StoryUtils'
import StageObjectsRenderer from '../StageObject/StageObjectsRenderer'

const stories = storiesOf('Dungeon Renderer', module);

const dungeonTemplate = {
    theme: 'crypt',
    floorCount: 1,
    floorRoomCodes: [
        ['L', 'TR', 'BR']
    ]
}
const dungeon = gertyGenerate(dungeonTemplate);

stories.addDecorator(withKnobs);

stories
    .add('Gerty - roomCodes and wall cross sections', () => {
        const dungeonTemplate = {
            theme: 'crypt',
            floorCount: 1,
            floorRoomCodes: [
                ['R', 'TL', 'BL']
            ]
        }
        const dungeon = gertyGenerate(dungeonTemplate);
        return <DungeonRenderer dungeon={dungeon} activeFloorIndex={0} />
    })
    .add('Gerty', () => {

        return <div>
            <DungeonRenderer dungeon={dungeon} activeFloorIndex={parseInt(select('floor index', [0, 1, 2], 0))} />
            <RefreshButton />
        </div>
    })
    .add('Gerty & stage props', () => {

        return <div>
            <DungeonRenderer dungeon={dungeon} activeFloorIndex={parseInt(select('floor index', [0, 1, 2], 0))} />
            <RefreshButton />
        </div>
    })

