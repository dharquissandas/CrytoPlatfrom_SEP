import {cc1} from '../cryptocurrencies/cc1'
import {cc2} from '../cryptocurrencies/cc2'
import {cc3} from '../cryptocurrencies/cc3'


export const createData = (auth, wallets) => {
    return new Promise(function (resolve) {
        let cc1Amount = 0
        let cc2Amount = 0
        let cc3Amount = 0
        let cc1Transactions = []
        let cc2Transactions = []
        let cc3Transactions = []
        if(wallets){
            for(let i = 0; i < wallets.length; i++){
                if(auth.uid === wallets[i].userId || auth.uid === wallets[i].recipientid){
                    if(wallets[i].cryptocurrency === cc1.getName()){
                        if(wallets[i].transactionType === "buy"){
                            cc1Amount = cc1Amount + parseFloat(wallets[i].purchasedAmount)
                        }
                        else if(wallets[i].transactionType === "sell"){
                            cc1Amount = cc1Amount - parseFloat(wallets[i].purchasedAmount)
                        }
                        else{
                            if(wallets[i].userId === auth.uid){
                                cc1Amount = cc1Amount - parseFloat(wallets[i].purchasedAmount)
                            }
                            else if(wallets[i].recipientid === auth.uid){
                                cc1Amount = cc1Amount + parseFloat(wallets[i].purchasedAmount)
                            }
                            else{}
                        }
                        cc1Transactions.push(wallets[i])
                    }
                    else if(wallets[i].cryptocurrency === cc2.getName()){
                        if(wallets[i].transactionType === "buy"){
                            cc2Amount = cc2Amount + parseFloat(wallets[i].purchasedAmount)
                        }
                        else if(wallets[i].transactionType === "sell"){
                            cc2Amount = cc2Amount - parseFloat(wallets[i].purchasedAmount)
                        }
                        else{
                            if(wallets[i].userId === auth.uid){
                                cc2Amount = cc2Amount - parseFloat(wallets[i].purchasedAmount)
                            }
                            else if(wallets[i].recipientid === auth.uid){
                                cc2Amount = cc2Amount + parseFloat(wallets[i].purchasedAmount)
                            }
                            else{}
                        }
                        cc2Transactions.push(wallets[i])
                    }
                    else if(wallets[i].cryptocurrency === cc3.getName()){
                        if(wallets[i].transactionType === "buy"){
                            cc3Amount = cc3Amount + parseFloat(wallets[i].purchasedAmount)
                        }
                        else if(wallets[i].transactionType === "sell"){
                            cc3Amount = cc3Amount - parseFloat(wallets[i].purchasedAmount)
                        }
                        else{
                            if(wallets[i].userId === auth.uid){
                                cc3Amount = cc3Amount - parseFloat(wallets[i].purchasedAmount)
                            }
                            else if(wallets[i].recipientid === auth.uid){
                                cc3Amount = cc3Amount + parseFloat(wallets[i].purchasedAmount)
                            }
                            else{}
                        }
                        cc3Transactions.push(wallets[i])
                    }
                    else{
                        continue
                    }
                }
            }
        }
        resolve({cc1Amount,cc2Amount,cc3Amount, cc1Transactions, cc2Transactions, cc3Transactions})
    });
}
