import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs';
import Inventory from './Inventory'
import Player from '../Player/Player'

const stories = storiesOf('Inventory', module);

stories.addDecorator(withKnobs);

stories
    .add('inventory prop', () => {
        const player = new Player({
            position: { x: 0, y: 0 }
        });

        return <div>
            <Inventory player={player} closeInventory={() => {}}/>
        </div>
    })

