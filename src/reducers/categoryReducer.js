import { types } from './../types/types';

const initialState = {
    categories: [],
    activeCategory: null
}

export const categoryReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.categoryLoaded:
            return {
                ...state,
                categories: action.payload
            }

        case types.categoryLogout:
            return {
                ...initialState
            }

        case types.categoryActive:
            return {
                ...state,
                activeCategory: action.payload
            }

        case types.categoryClearActive:
            return {
                ...state,
                activeCategory: null
            }
    
        default:
            return state;
    }
}