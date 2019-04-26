import { forceReRender } from '@storybook/react';
import React from 'react';

const RefreshButton = () => {
    return <button style={{ position: 'absolute', bottom: '0'}} onClick={() => forceReRender()}>Refresh Render</button>
}

export {
    RefreshButton
}