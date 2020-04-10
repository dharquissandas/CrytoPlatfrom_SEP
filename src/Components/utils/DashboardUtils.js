import moment from 'moment'

export const userData = (users, currentUser, accType) => {
    let userDataArray = []
    for(let i = 0; i < users.length; i++){
        if(accType !== "any"){
            if(currentUser !== users[i].id && users[i].account === accType){
                let user = {}
                user.id = i
                user.uid = users[i].id
                user.value = users[i].em
                userDataArray.push(user)
            }
        }else{
            if(currentUser !== users[i].id){
                let user = {}
                user.id = i
                user.uid = users[i].id
                user.value = users[i].em
                userDataArray.push(user)
            }
        }
    }
    return userDataArray
}

export const findUser = (currentUser, users, choice, accType) => {
    for(let i = 0; i < users.length; i++){
        if(accType !== "any"){
            if(currentUser !== users[i].id && users[i].account === accType && users[i].em === choice.value){
                return users[i]
            }
        }
        else{
            if(currentUser !== users[i].id && users[i].em === choice.value){
                return users[i]
            }
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

export const bSearch = (broadcasts, criteria) => {
    let results = []
    let dateFrom = criteria.startDate
    let dateTo = criteria.endDate


    for(let i = 0; i< broadcasts.length; i++){
        let dateCheck = moment(broadcasts[i].timestamp.toDate()).format().substr(0,10)
        if(criteria.analyst.em === broadcasts[i].email && moment(dateCheck).isBetween(dateFrom, dateTo, null, "[]")){
            results.push(broadcasts[i])
        }
    }

    return results
}

export const idSearch = (id, users) => {
    for(let i = 0; i<users.length; i++){
        if(users[i].id === id){
            return users[i]
        }
    }
}

export const categorySearch = (c , users) => {
    let results = []
    for(let i=0; i<users.length; i++){
        if(c === "any"){
            return users
        }
        else{
            if(c === users[i].account){
                results.push(users[i])
            }
        }
    }
    return results
}