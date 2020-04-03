const initState = {
    wallets:[]
}


const walletReducer = (state = initState, action) => {
    switch(action.type) {
        case 'FIAT_WALLET_UPDATE':
            console.log('Fiat Wallet Updated', action.wallet);
            return state;
        case 'WALLET_ERROR':
            console.log('wallet error', action.err);
            return state;
        default:
            return state;
    }
}

export default walletReducer 