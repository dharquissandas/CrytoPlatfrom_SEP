const initState = {
    authError: null,
    emailError : null
}

const authReducer = (state = initState, action) => {
    switch(action.type){
        case "LOGIN_ERROR":
            console.log('login failed');
            return{
                ...state,
                authError: 'Login Failed'
            }
        case 'LOGIN_SUCCESS':
            console.log('login success');
            return{
                ...state,
                authError: null
            }

        case 'SIGNOUT_SUCCESS':
            console.log('signout success');
            return state;
        case 'SIGNUP_SUCCESS':
            console.log('signup success')
            return {
                ...state,
                authError: null
            } 
        case 'SIGNUP_ERROR':
            console.log('signup error')
            return {
                ...state,
                authError: action.err.message
            }
        case 'UPGRADE_SUCCESS':
            console.log('upgrade success')
            return state
        case 'UPGRADE_ERROR':
            console.log('upgrade error')
            return state
        case 'UPDATE_SUCCESS':
            console.log('update success')
            return state
        case 'UPDATE_ERROR':
            console.log('update error')
            return state
        case 'EMAIL_UPDATED':
            console.log('email update success')
            return {
                ...state,
                emailError : null
            }
        case 'EMAIL_ERROR':
            return {
                ...state,
                emailError: action.err.message
            }
        default:
            return state;
    }
}

export default authReducer