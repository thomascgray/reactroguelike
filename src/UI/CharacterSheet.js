import React, { Component } from 'react';
import './UI.css'
import './CharacterSheet.css'
import Uuid from 'uuid/v4'
import StringUtils from '../Utils/String'

import Grammar from '../Utils/Grammar'

class CharacterSheet extends Component {
    makeActive (i) {
        this.props.player.setActiveMeleeWeapon(i.id)
    }

    render() {
        const bodyParts = this.props.player.HasBody.getBodyParts();

        return (
            <div>
                <p>{StringUtils.title(window.player.HasArchetype.getArchetype())}</p>

                <div className='box'>
                    {Object.keys(bodyParts).map(bodyPartName => {
                        return renderBodyPartInformation(bodyParts[bodyPartName], bodyPartName)
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

const renderBodyPartInformation = (bodyPart, bodyPartName) => {
    if (bodyPart.isHolding == null && bodyPart.types.includes('primary')) {
        return <p>your <strong>{bodyPartName}</strong> is empty</p>
    }

    if (bodyPart.isHolding) {
        return <React.Fragment>
            <p>{Grammar.isHoldingPreposition(bodyPartName)} your <strong>{bodyPartName}</strong> {Grammar.isHoldingStyle(bodyPartName)} <strong>{bodyPart.isHolding.name}</strong></p>
            {renderItemInformation(bodyPart.isHolding)}
        </React.Fragment>
    }
}

const renderItemInformation = item => {
    switch (item.type) {
        case 'weapon':
            return renderWeaponInformation(item);
        case 'armour':
            return renderArmourInformation(item);
    }
}

const renderWeaponInformation = item => {
    return <p>{item.damage}</p>
}

const renderArmourInformation = item => {
    return <p>{item.damage}</p>
}

export default CharacterSheet;
