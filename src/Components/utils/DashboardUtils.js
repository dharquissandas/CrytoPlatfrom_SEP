import moment from 'moment'

export const userData = (users, currentUser) => {
    let userDataArray = []
    for(let i = 0; i < users.length; i++){
        if(currentUser !== users[i].id && users[i].account === "trader"){
            let user = {}
            user.id = i
            user.uid = users[i].id
            user.value = users[i].em
            userDataArray.push(user)
        }
    }
    return userDataArray
}

export const findTrader = (currentUser, users, choice) => {
    for(let i = 0; i < users.length; i++){
        if(currentUser !== users[i].id && users[i].account === "trader" && users[i].em === choice.value){
            return users[i]
        }
    }
    return null
}

export const search = (transactions, criteria) => {
    let results = []
    let dateFrom = criteria.startDate
    let dateTo = criteria.endDate
    let tt = criteria.tt
    console.log(criteria)
    for(let i = 0; i< transactions.length; i++){
        let dateCheck = moment(transactions[i].timestamp.toDate()).format().substr(0,10)
        if(criteria.cryptocurrency === transactions[i].cryptocurrency && moment(dateCheck).isBetween(dateFrom, dateTo, null, "[]")){
            if(tt !== "Any"){
                console.log(transactions[i].transactionType)
                if(tt.toLowerCase() === transactions[i].transactionType){
                    results.push(transactions[i])
                }
            }
            else{
                results.push(transactions[i])
            }
        }
    }

    return results
}