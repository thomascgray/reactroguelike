import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs';
import StageProp from './StageProp'
import StagePropRenderer from './StagePropRenderer'

const stories = storiesOf('StageProp', module);

stories.addDecorator(withKnobs);

stories
    .add('stage prop', () => {
        const stageProp = new StageProp({
            position: {
                x: 2,
                y: 2,
            },
            archetype: select('stage prop archetype', [
                'woodChair',
                'woodThrone',
                'warriorStatue',
                'graveBroken',
            ], 'woodChair')
        });

        return <div>
            <StagePropRenderer stageProp={stageProp} />
        </div>
    })

