const randomFloat = require('random-float');
const BackgroundForever = new require('background-forever').BackgroundForever;

let prices = [15.23, 13.11, 10.00, 12.43, 15.33, 17.56, 18.22, 18.59, 17.56, 19.89]
let currentPrice = 19.89
let name = "Ethereum"

const bf2 = new BackgroundForever(() => {
    return new Promise((resolve, reject) => {
        currentPrice = Math.round(randomFloat(10,20)*100)/100
        if(prices.length === 10){
            prices.shift()
        }
        prices.push(currentPrice)
        console.log(prices)
        setTimeout(() => {
            resolve();
        }, 60000);
    });
}); 

bf2.start();

class cc2 {
    static getCC2 = () =>{
        return bf2
    }
    
    static getName = () => {
        return name
    }

    static getPrices = () =>{
        return prices
    }
    
    static getCurrentPrice = () => {
        return currentPrice
    }
}

export {cc2};
