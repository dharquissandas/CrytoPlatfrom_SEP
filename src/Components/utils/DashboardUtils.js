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
    console.log(choice)
    console.log(users)
    console.log(currentUser)
    for(let i = 0; i < users.length; i++){
        if(currentUser !== users[i].id && users[i].account === "trader" && users[i].em === choice.value){
            return users[i]
        }
    }

    return null
}