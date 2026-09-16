class StockPort {
    constructor(){
        this.holdings = new Map();
    }
    isEmpty() {
        return this.holdings.size === 0;
    

    }
    purchase(symbol, shares){
        const currentShares = this.holdings.get(symbol) ?? 0;
        this.holdings.set(symbol,currentShares + shares);
    }
    sell(symbol, shares){
        const currentShares = this.holdings.get(symbol);
        if(shares > currentShares){
            throw new Error('Not possible to sell this number of shares.');
        }         
        const remainingShares = currentShares - shares;
        
        if(remainingShares == 0){
        this.holdings.delete(symbol);
        return;
    }
        this.holdings.set(symbol, remainingShares);
}
    getUniqueSymbolCount(){
        return this.holdings.size;
    }
    getShares(symbol){
        return this.holdings.get(symbol) ?? 0; // here i use zero if the value thats given is undefined
    }
    }


module.exports = StockPort;