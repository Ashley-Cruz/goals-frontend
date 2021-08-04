import { types } from './../types/types';

const initialState = {
    goals: [],
    activeGoal: null
}

export const goalReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.goalLoaded:
            return {
                ...state,
                goals: action.payload
            }

        case types.goalLogout:
            return {
                ...initialState
            }

        case types.goalAdded:
            return {
                ...state,
                goals: [
                    ...state.goals,
                    action.payload
                ],
                activeGoal: null
            }

        case types.goalActive:
            return {
                ...state,
                activeGoal: action.payload
            }

        case types.goalClearActive:
            return {
                ...state,
                activeGoal: null
            }

        case types.goalDeleted:
            return {
                ...state,
                goals: state.goals.filter(
                    e => (e.id !== state.activeGoal.id)
                )
            }

        case types.goalUpdated:
            return {
                ...state,
                goals: state.goals.map(
                    goal => (goal.id === action.payload.id) ? action.payload : goal
                )
            }
    
        default:
            return state;
    }
}