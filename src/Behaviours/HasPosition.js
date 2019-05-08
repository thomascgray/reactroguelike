import _ from 'lodash'
import { attachProperty } from '../Utils/EntityHelpers'

class HasPosition {
    constructor(entity, position = { x: 0, y: 0 }) {
        attachProperty(this, entity, 'position', position)

        this.functions = {
            setPosition: position => {
                this.position = position;
                return this.position;
            },
            getPosition: () => {
                return this.position;
            },
            moveLeft: (distance = 1) => {
                this.position = {
                    x: this.position.x - distance,
                    y: this.position.y,
                }
                return this.position
            },
            moveRight: (distance = 1) => {
                this.position = {
                    x: this.position.x + distance,
                    y: this.position.y,
                }
                return this.position
            },
            moveUp: (distance = 1) => {
                this.position = {
                    x: this.position.x,
                    y: this.position.y - distance,
                }
                return this.position
            },
            moveDown: (distance = 1) => {
                this.position = {
                    x: this.position.x,
                    y: this.position.y + distance,
                }
                return this.position
            },
        }
    }
}

export default HasPosition;
