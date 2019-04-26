import React from 'react';

import { storiesOf } from '@storybook/react';
import { generate as gertyGenerate } from '../DungeonGenerator/Gerty'
import DungeonRenderer from '../Dungeon/DungeonRenderer'
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs';
import { RefreshButton } from './StoryUtils'
import StageObjectsRenderer from '../StageObject/StageObjectsRenderer'

const stories = storiesOf('Dungeon Renderer', module);

const dungeonTemplate = {
    theme: 'crypt'
}
const dungeon = gertyGenerate(dungeonTemplate);

stories.addDecorator(withKnobs);

stories
    .add('Gerty', () => {

        return <div>
            <DungeonRenderer dungeon={dungeon} activeFloorIndex={parseInt(select('floor index', [0, 1, 2], 0))} />
            <RefreshButton />
        </div>
    })

