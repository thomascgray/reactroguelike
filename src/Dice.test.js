import Dice from './Dice'

describe('Dice', () => {
    const testRuns = 100;
    test('1d4', () => {
        for (let i = 0; i < testRuns; i++) {
            const result = Dice('1d4');
            expect(result).toBeGreaterThanOrEqual(1);
            expect(result).toBeLessThanOrEqual(4);
        }
    });

    test('1d4 + 2', () => {
        for (let i = 0; i < testRuns; i++) {
            const result = Dice('1d4 + 2');
            expect(result).toBeGreaterThanOrEqual(3);
            expect(result).toBeLessThanOrEqual(6);
        }
    });

    test('1d6 - 4', () => {
        for (let i = 0; i < testRuns; i++) {
            const result = Dice('1d6 - 4');
            expect(result).toBeGreaterThanOrEqual(1);
            expect(result).toBeLessThanOrEqual(2);
        }
    });
});