import { fetchConToken, fetchSinToken } from '../helpers/fetch';
import { types } from './../types/types';
import { categoriesLogout, startLoadingCategories } from './category';
import { goalsLogout, startLoadingGoals } from './goal';

export const startLogin = (data) => {
    return async(dispatch) => {

        try {
            
            const resp = await fetchSinToken('auth', data, 'POST');
            const body = await resp.json();
            
            if(body.ok){
                localStorage.setItem('token', body.data.token);
    
                const {uid, name} = body.data;
                dispatch(login({
                    uid,
                    name
                }))
                dispatch(startLoadingCategories());
                dispatch(startLoadingGoals());
            }

        } catch (error) {
            console.log(error);
        }
    }
}

const login = (user) => ({
    type: types.authlogin,
    payload: user
})

export const startLogout = () => {
    return(dispatch) => {
        dispatch(logout());
        dispatch(categoriesLogout());
        dispatch(goalsLogout());
    }
}

const logout = () => ({
    type: types.authLogout
})

export const StartChecking = () => {
    return async(dispatch) => {

        try {

            const resp = await fetchConToken('auth/renew');
            const body = await resp.json();
    
            if(body.ok){
                localStorage.setItem('token', body.data.token);
    
                const {uid, name} = body.data;
                dispatch(login({
                    uid,
                    name
                }))
                dispatch(startLoadingCategories());
                dispatch(startLoadingGoals());
            }
            
        } catch (error) {
            console.log(error);
        }
    }
}