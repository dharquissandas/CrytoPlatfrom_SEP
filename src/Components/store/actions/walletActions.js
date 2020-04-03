export const updateFiatWallet = (wallet) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        //DB Call
        const fs = getFirestore();
        const userId = getState().firebase.auth.uid;
        const prevAmount = getState().firebase.profile.fiatAmount
        let newAmount = 0
        if(wallet.type === "add"){
            newAmount = parseFloat(prevAmount) + parseFloat(wallet.amount)
        }
        else{
            newAmount = parseFloat(prevAmount) - parseFloat(wallet.amount)
        }

        const newAmountString = "" + newAmount
        console.log(wallet)

        return fs.collection('users').doc(userId).update({
            fiatAmount : newAmountString
        }).then(() => {
            dispatch({type: 'FIAT_WALLET_UPDATE'}, wallet)
        }).catch((err) => {
            dispatch({type: 'WALLET_ERROR'}, err)
        })

    }
}