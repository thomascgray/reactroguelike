import React, { Component } from 'react';
import './UI.css'
import './CharacterSheet.css'

class CharacterSheet extends Component {
    makeActive (i) {
        this.props.player.setActiveMeleeWeapon(i.id)
    }

    render() {
        const bodyParts = this.props.player.HasBodyParts.getBodyParts();

        return (
            <div>
                {Object.keys(bodyParts).map(bodyPartName => {
                    return <div>
                        <strong>{bodyPartName}</strong>
                        {bodyParts[bodyPartName].canHold && bodyParts[bodyPartName].isHolding == null ? <span> (empty)</span> : null }
                        {bodyParts[bodyPartName].canHold && bodyParts[bodyPartName].isHolding != null ? <span> is holding your <strong>{bodyParts[bodyPartName].isHolding.name}</strong></span> : null }
                    </div>
                })}
            </div>
        );
    }
}

export default CharacterSheet;
