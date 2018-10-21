import React from 'react';

import { storiesOf } from '@storybook/react';
import { generate as gertyGenerate } from '../DungeonGenerator/Gerty'
import DungeonRenderer from '../Dungeon/DungeonRenderer'
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs';
import { RefreshButton } from './StoryUtils'
import StageObjectsRenderer from '../StageObject/StageObjectsRenderer'
import Enemy from '../Enemy/Enemy'
import StageProp from '../StageProp/StageProp'

const stories = storiesOf('Section Renderer', module);

stories.addDecorator(withKnobs);

stories
    .add('section', () => {
        const map = [
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0]
        ]

        const roomTemplateId = number('room template id', 1)

        const template = _.cloneDeep(require(`../SectionTemplates/${roomTemplateId}.json`))

        if (!template.enemies) {
            template.enemies = []
        }
        if (!template.stageProps) {
            template.stageProps = []
        }
        const enemies = template.enemies.map(enemy => {
            return new Enemy({
                position: enemy.position,
                hp: 5, 
                archetype: enemy.archetype
            });
        });
    
        const stageProps = template.stageProps.map(stageProp => {
            return new StageProp({
                position: stageProp.position,
                hp: 5, 
                archetype: stageProp.archetype
            });
        });

        let stageObjects = [];
        stageObjects = stageObjects.concat(enemies);
        stageObjects = stageObjects.concat(stageProps);
    
        // change the real map to be affected by the template map
        // but find anything that isnt a number and match it to the stage props or enemies
        for(let y = 0; y < 7; y++) {
            for(let x = 0; x < 7; x++) {
                map[x][y] = template.map[y][x]
            }
        }

        // patch the walls
        for(let y = 0; y < 7; y++) {
            for(let x = 0; x < 7; x++) {
                if (map[x][y] === 1 && map[x][y + 1] === 0) {
                    map[x][y] = 2;
                }
            }
        }

        return <div>
            <DungeonRenderer dungeon={{
                map
            }} />
            <StageObjectsRenderer stageObjects={stageObjects.map(obj => obj.toState())} />
            <RefreshButton />
        </div>
    })

