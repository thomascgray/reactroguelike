import { generate } from './Gerty'
import DungeonFloor from '../Dungeon/DungeonFloor'

describe('Gerty', () => {
    test('setting theme from template', () => {
        const template = {
            theme: 'crypt'
        }

        const dungeon = generate(template)

        expect(dungeon.theme).toEqual('crypt')
    });

    test('floor count is null, do 3 floors', () => {
        const template = {
            theme: 'crypt',
            floorCount: null
        }

        const dungeon = generate(template)

        expect(dungeon.floors.length).toEqual(3)
    });

    test('every floor is an instance of a DungeonFloor', () => {
        const template = {
            theme: 'crypt',
        }

        const dungeon = generate(template)

        dungeon.floors.forEach(floor => {
            expect(floor).toBeInstanceOf(DungeonFloor)
        })
    });

    test.only('generate some stageObjects', () => {
        const template = {
            theme: 'crypt',
            floorCount: 1,
            floorRoomCodes: [
                ['L', 'TR', 'BR']
            ]
        }

        const dungeon = generate(template)

        expect(dungeon.stageObjects).toBeInstanceOf(Array)
    })
})