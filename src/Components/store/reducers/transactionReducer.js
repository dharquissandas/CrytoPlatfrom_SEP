const initState = {
    transactions:[]
}

const transactionReducer = (state = initState, action) => {
    switch(action.type) {
        case 'TRANSACT':
            console.log('transaction complete', action.transaction);
            return state;
        case 'TRANSACT_ERROR':
            console.log('transaction error', action.err);
            return state;
        case 'EXPORT':
            console.log('export complete');
            return state;
        case 'EXPORT_ERROR':
            console.log('export error');
            return state;
        case 'IMPORT':
            console.log('import complete');
            return state;
        case 'IMPORT_ERROR':
            console.log('import error', action.err);
            return {
                ...state,
                importError: action.err
            }
        default:
            return state;
    }
}

export default transactionReducer 