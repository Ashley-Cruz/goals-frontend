import { fetchConToken } from "../helpers/fetch";
import Swal from 'sweetalert2';
import { types } from './../types/types';

export const startLoadingGoals = () => {
    return async(dispatch) => {

        try {
            const resp = await fetchConToken('goal',);
            const body = await resp.json();
            
            if(body.ok){
                dispatch(goalsLoaded(body.data));
            }

        } catch (error) {
            console.log(error);
        }
    }
}

const goalsLoaded = (goals) => ({
    type: types.goalLoaded,
    payload: goals
})

export const goalsLogout = () => ({
    type: types.goalLogout
})

export const startAddingGoal = (goal) => {
    return async(dispatch) => {
        try {
            
            const resp = await fetchConToken('goal', goal, 'POST');
            const body = await resp.json();
            
            if(body.ok){
                Swal.fire({
                    icon: 'success',
                    title: '!Genial!',
                    text: 'La meta fue agregada de manera exitosa',
                    buttonsStyling: false,
                    background: ' #272932'
                })
                console.log(body)
                dispatch(goalAdded(body.data));
            }

        } catch (error) {
            console.log(error);
        }
    }
}

const goalAdded = (goal) => ({
    type: types.goalAdded,
    payload: goal
})

export const goalActive = (goal) => ({
    type: types.goalActive,
    payload: goal
})

export const goalClearActive = () => ({
    type: types.goalClearActive
})

export const startUpdatingGoal = (goal) => {
    return async(dispatch, getState) => {
        
        const {id} = getState().goal.activeGoal;

        try {
            const resp = await fetchConToken(`goal/${id}`, goal, 'PUT');
            const body = await resp.json();
            
            if(body.ok){
                Swal.fire({
                    icon: 'success',
                    title: '!Genial!',
                    text: 'La meta fue actualizada de manera exitosa',
                    buttonsStyling: false,
                    background: ' #272932'
                })

                dispatch(goalUpdated(body.data));
                dispatch(goalClearActive());
            }

        } catch (error) {
            console.log(error)
        }
    }
}

const goalUpdated = (goal) => ({
    type: types.goalUpdated,
    payload: goal
})

export const startDelitingGoal = () => {
    return async(dispatch, getState) => {

        const {id} = getState().goal.activeGoal;

        try {
            
            const resp = await fetchConToken(`goal/${id}`, {}, 'DELETE');
            const body = await resp.json();
            
            if(body.ok){
                Swal.fire({
                    icon: 'success',
                    title: 'Listo',
                    text: 'La meta fue eliminada de manera exitosa',
                    buttonsStyling: false,
                    background: ' #272932'
                })

                dispatch(goalDeleted());
                dispatch(goalClearActive());
            }

        } catch (error) {
            console.log(error)
        }
    }
}

export const goalDeleted = () => ({
    type: types.goalDeleted
})