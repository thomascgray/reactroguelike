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
    .add('gerty', () => {
        const dungeonTemplate = {
            sectionWidth: number('section width', 7),
            sectionHeight: number('section height', 7),
            theme: select('theme', ['crypt', 'dungeon'], 'crypt'),
            doors: {
                north: true,
                east: true,
                south: true,
                west: true,
            },
            doorPlacement: select('door placement', [
                'center',
                'random',
            ], 'random')
        }
        
        const dungeon = gertyGenerate(dungeonTemplate);
        return <div>
            <DungeonRenderer dungeon={dungeon} />
            <RefreshButton />
        </div>
    })
    .add('gerty and stage objects', () => {
        const dungeonTemplate = {
            sectionWidth: number('section width', 7),
            sectionHeight: number('section height', 7),
            theme: select('theme', ['crypt', 'dungeon'], 'crypt'),
            doors: {
                north: true,
                east: true,
                south: true,
                west: true,
            },
            doorPlacement: select('door placement', [
                'center',
                'random',
            ], 'random')
        }
        
        const dungeon = gertyGenerate(dungeonTemplate);

        return <div>
            <DungeonRenderer dungeon={dungeon} />
            <StageObjectsRenderer stageObjects={dungeon.stageObjects.map(obj => obj.toState())} />
            <RefreshButton />
        </div>
    })
    .add('gerty and mouse animations', () => {
        const dungeonTemplate = {
            sectionWidth: number('section width', 7),
            sectionHeight: number('section height', 7),
            theme: select('theme', ['crypt', 'dungeon'], 'crypt'),
            doors: {
                north: true,
                east: true,
                south: true,
                west: true,
            },
            doorPlacement: select('door placement', [
                'center',
                'random',
            ], 'random')
        }
        
        const dungeon = gertyGenerate(dungeonTemplate);

        return <div>
            <DungeonRenderer dungeon={dungeon} />
            <RefreshButton />
        </div>
    })

