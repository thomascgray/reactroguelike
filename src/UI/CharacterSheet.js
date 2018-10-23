import React, { Component } from 'react';
import './UI.css'
import './CharacterSheet.css'
import Uuid from 'uuid/v4'
import {title} from '../Utils/String'
class CharacterSheet extends Component {
    makeActive (i) {
        this.props.player.setActiveMeleeWeapon(i.id)
    }

    render() {
        const bodyParts = this.props.player.HasBody.getBodyParts();

        return (
            <div>
                <p>{title(window.player.HasArchetype.getArchetype())}</p>

                <div className='box'>
                    {Object.keys(bodyParts).map(bodyPartName => {
                        return renderBodyPart(bodyParts[bodyPartName], bodyPartName)
                    })}
                </div>

                <p><strong>powers</strong></p>
                {this.props.player.HasPowers.getPowers().map(power => {
                    return <div>
                        <strong>{power.name}</strong>
                    </div>
                })}
            </div>  
        );
    }
}

const renderBodyPart = (bodyPart, bodyPartName) => {
    if (bodyPart.isHolding == null && bodyPart.types.includes('primary')) {
        return <p>your <strong>{bodyPartName}</strong> is empty</p>
    }
}

export default CharacterSheet;
