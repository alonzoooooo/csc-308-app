const StockPort = require('./tdd-testing.js');

describe('StockPortfolio', () => {
    let portfolio;

    beforeEach(() => {
        portfolio = new StockPort();
    });

    test('A portfolio starts without having stocks', () => {
        expect(portfolio.holdings.size).toBe(0);
        
    });
    test('If portfolio is empty test will state that', () => {
        expect(portfolio.isEmpty()).toBe(true);
    });
    test('purchasing shares adds the stock to the portfolio', () => {
        portfolio.purchase('GMR', 5);
        expect(portfolio.holdings.get('GMR')).toBe(5);
    });
    test('multiple purchases of the same stock add the shares together', () => {
        portfolio.purchase('GMR', 5);
        portfolio.purchase('GMR', 3);
        expect(portfolio.holdings.get('GMR')).toBe(8);
    });
    test('selling shares subtracts them from the stock', () =>{
        portfolio.purchase('GMR', 10);
        portfolio.sell('GMR', 4);
        expect(portfolio.holdings.get('GMR')).toBe(6);
    });
    test('counts the number of unique ticker symbols', () => {
        portfolio.purchase('GMR', 5);
        portfolio.purchase('GMR', 3);
        portfolio.purchase('RBLX', 10);
        expect(portfolio.getUniqueSymbolCount()).toBe(2);
    });
    test('removes a ticker symbol all of its shares are sold', () =>{
        portfolio.purchase('GMR', 5);
        portfolio.sell('GMR', 5);
        expect(portfolio.holdings.has('GMR')).toBe(false);
        expect(portfolio.getUniqueSymbolCount()).toBe(0);
        expect(portfolio.isEmpty()).toBe(true);
    });
    test('says the number of shares owned for a ticker symbol', () => {
        portfolio.purchase('GMR', 7);
        expect(portfolio.getShares('GMR')).toBe(7);
    });
    test('returns zero when the ticker symbol isnt owned', () => {
        expect(portfolio.getShares('RBLX')).toBe(0);
    });
    test('throws an error when selling more shares than are owned', () => {
        portfolio.purchase('GMR', 5); 
        expect(() => {
            portfolio.sell('GMR', 6);
        }).toThrow('Not possible to sell this number of shares.');
        expect(portfolio.getShares('GMR')).toBe(5);
});

});