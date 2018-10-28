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
                        return <div key={Uuid()}>
                            {renderBodyPartInformation(bodyParts[bodyPartName], bodyPartName)}
                        </div>
                    })}
                </div>

                <p><strong>powers</strong></p>
                {this.props.player.HasPowers.getPowers().map(power => {
                    return <div key={Uuid()}>
                        <strong>{power.name}</strong>
                    </div>
                })}
            </div>  
        );
    }
}

const renderBodyPartInformation = (bodyPart, bodyPartName) => {
    // if you can hold, but you're not holding anything but we should ALWAYS say something, say you're empty
    if (bodyPart.isHolding && bodyPart.isHolding.length <= 0 && bodyPart.types.includes('gripPrimary')) {
        return <p>your <strong>{bodyPartName}</strong> is empty</p>
    }

    // if you can wear, but you're not wearing anything but we should ALWAYS say something, say you're bare
    if (bodyPart.isWearing && bodyPart.isWearing.length <= 0 && bodyPart.types.includes('wearPrimary')) {
        return <p>your <strong>{bodyPartName}</strong> is bare</p>
    }

    // if the body part is holding something, or wearing something, write it out
    if ((bodyPart.isHolding && bodyPart.isHolding.length >= 1) || (bodyPart.isWearing && bodyPart.isWearing.length >= 1)) {
        return <p>your <strong>{bodyPartName}</strong> is {Grammar.formSecondPersonFullItemsSentence(bodyPart.isHolding, bodyPart.isWearing)}</p>
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
