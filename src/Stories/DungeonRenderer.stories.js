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
    .add('Gerty', () => {
        const dungeonTemplate = {
            theme: select('theme', ['crypt', 'dungeon'], 'crypt'),
        }

        const dungeon = gertyGenerate(dungeonTemplate);
        
        return <div>
            <DungeonRenderer map={dungeon.map} theme={dungeon.theme} />
            <RefreshButton />
        </div>
    })

