import React from 'react';

import { storiesOf } from '@storybook/react';
import { generate as gertyGenerate } from '../DungeonGenerator/Gerty'
import DungeonRenderer from '../Dungeon/DungeonRenderer'
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs';
import { RefreshButton } from './StoryUtils'
import StageObjectsRenderer from '../StageObject/StageObjectsRenderer'

const stories = storiesOf('Dungeon Renderer', module);

stories.addDecorator(withKnobs);

stories
    .add('Gerty - roomCodes [`L`, `TR`, `BR`]', () => {
        const dungeonTemplate = {
            theme: 'crypt',
            floorCount: 1,
            floorRoomCodes: [
                ['L', 'TR', 'BR']
            ]
        }
        const dungeon = gertyGenerate(dungeonTemplate);
        return <div>
            <DungeonRenderer dungeon={dungeon} activeFloorIndex={0} />
            <StageObjectsRenderer stageObjects={dungeon.floors[dungeon.activeFloorIndex].stageObjects} />
        </div>
    })
    .add('Gerty - roomCodes [`TL`, `BL`, `R`]', () => {
        const dungeonTemplate = {
            theme: 'crypt',
            floorCount: 1,
            floorRoomCodes: [
                ['TL', 'BL', 'R']
            ]
        }
        const dungeon = gertyGenerate(dungeonTemplate);
        return <DungeonRenderer dungeon={dungeon} activeFloorIndex={0} />
    })
    .add('Gerty - roomCodes [`TL`, `TR`, `B`]', () => {
        const dungeonTemplate = {
            theme: 'crypt',
            floorCount: 1,
            floorRoomCodes: [
                ['TL', 'TR', 'B']
            ]
        }
        const dungeon = gertyGenerate(dungeonTemplate);
        return <DungeonRenderer dungeon={dungeon} activeFloorIndex={0} />
    })
    .add('Gerty - roomCodes [`BL`, `BR`, `T`]', () => {
        const dungeonTemplate = {
            theme: 'crypt',
            floorCount: 1,
            floorRoomCodes: [
                ['BL', 'BR', 'T']
            ]
        }
        const dungeon = gertyGenerate(dungeonTemplate);
        return <DungeonRenderer dungeon={dungeon} activeFloorIndex={0} />
    })
    .add('Gerty - roomCodes [`T`, `B`]', () => {
        const dungeonTemplate = {
            theme: 'crypt',
            floorCount: 1,
            floorRoomCodes: [
                ['T', 'B']
            ]
        }
        const dungeon = gertyGenerate(dungeonTemplate);
        return <DungeonRenderer dungeon={dungeon} activeFloorIndex={0} />
    })
    .add('Gerty - roomCodes [`L`, `R`]', () => {
        const dungeonTemplate = {
            theme: 'crypt',
            floorCount: 1,
            floorRoomCodes: [
                ['L', 'R']
            ]
        }
        const dungeon = gertyGenerate(dungeonTemplate);
        return <DungeonRenderer dungeon={dungeon} activeFloorIndex={0} />
    })

