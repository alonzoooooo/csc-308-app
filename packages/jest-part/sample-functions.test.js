const myFunctions = require('./sample-function.js');

describe('div function', () => {
    test('divides two positive numbers', () => {
        const result = myFunctions.div(12,4);
        
        expect(result).toBe(3);
});

    test('divides by a negative numbers', () => {
        const result = myFunctions.div(12,-4);
        expect(result).toBe(-3);
    });
    test('divides 0 by positive number', () => {
        const result = myFunctions.div(0,4);
        
        expect(result).toBe(0);
    });
    test('returns decimal number if needed', () => {
        const result = myFunctions.div(1,3);
        expect(result).toBe(0.3333333333333333);
    });
    test('when you divide by 0 rets infinity', () =>{
        const result = myFunctions.div(17, 0);
        expect(result).toBe(Infinity);
    });
    test('rets NaN when you divide 0 by 0', () => {
        const result = myFunctions.div(0,0);
        expect(result).toBeNaN();
    });
});
describe('containsNumbers function', () => {
    test('returns true when a number appears in the middle', () => {
        const result = myFunctions.containsNumbers('abc1xyz');
        expect(result).toBe(true);
    });
    test('rets true when a number is at the beginning', () => {
        const result = myFunctions.containsNumbers('7up');
        expect(result).toBe(true);
    });
    test('returns true when a number appears at the beginning', () => {
        const result = myFunctions.containsNumbers('7up');
        expect(result).toBe(true);
    });
    test('returns false when the text contains only letters', () => {
        const result = myFunctions.containsNumbers('hello');
        expect(result).toBe(false);
    });
    test('returns false for an empty string', () => {
        const result = myFunctions.containsNumbers('hello');
        expect(result).toBe(false);
    });
    test('returns false when the text contains only punctuation', () => {
        const result = myFunctions.containsNumbers('!@#$%');
        expect(result).toBe(false);
    });
    test('returns false when the text contains only spaces', () => {
        const result = myFunctions.containsNumbers('   ');
        expect(result).toBe(false);
    });
    test('returns false for tabs and newlines', () => {
        const result = myFunctions.containsNumbers('\t\n');
        expect(result).toBe(false);
    });
});