const initState = {
    broadcasts:[]
}

const analystReducer = (state = initState, action) => {
    switch(action.type) {
        case 'BROADCAST':
            console.log('broadcast');
            return state;
        case 'BROADCAST_ERROR':
            console.log('broadcast error', action.err);
            return state;
        default:
            return state;
    }
}

export default analystReducer