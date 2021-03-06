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
        case 'MESSAGE':
            console.log('message');
            return state;
        case 'MESSAGE_ERROR':
            console.log('message error', action.err);
            return state;
        case 'CLOSE':
            console.log('close');
            return state;
        case 'CLOSE_ERROR':
            console.log('close error', action.err);
            return state;
        case 'DELETE_BROADCAST':
            console.log('broadcast');
            return state;
        default:
            return state;
    }
}

export default analystReducer