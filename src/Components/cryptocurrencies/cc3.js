const randomFloat = require('random-float');
const BackgroundForever = new require('background-forever').BackgroundForever;

let prices = [15.23, 10.22, 19.67, 12.43, 15.33, 17.56, 18.22, 18.59, 13.11, 19.89]
let currentPrice = 19.89
let name = "Bitcoin"

const bf3 = new BackgroundForever(() => {
    return new Promise((resolve, reject) => {
        currentPrice = Math.round(randomFloat(10,20)*100)/100
        if(prices.length === 10){
            prices.shift()
        }
        prices.push(parseFloat(currentPrice.toFixed(2)))
        console.log("c3", prices)
        setTimeout(() => {
            resolve();
        }, 60000);
    });
});
 
bf3.start();

class cc3 {
    static getCC3 = () =>{
        return bf3
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

export {cc3};
