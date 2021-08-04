import { types } from './../types/types';

const initialState = {
    name: null,
    uid: null
}

export const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.authlogin:
            return{
                ...state,
                ...action.payload
            }

        case types.authLogout:
            return{
                ...initialState
            }
        
        default:
            return state;
    }
}