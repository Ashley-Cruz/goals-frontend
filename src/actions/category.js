import { fetchSinToken } from "../helpers/fetch"
import { types } from './../types/types';

export const startLoadingCategories = () => {
    return async(dispatch) => {

        try {
            
            const resp = await fetchSinToken('categories');
            const body = await resp.json();
    
            if(body.ok){
                const {data} = body;
                dispatch(categoriesLoaded(data))
            }

        } catch (error) {
            console.log(error);
        }
    }
}

const categoriesLoaded = (categories) => ({
    type: types.categoryLoaded,
    payload: categories
})

export const categoriesLogout = () => ({
    type: types.categoryLogout
})

export const categoryActive = (category) => ({
    type: types.categoryActive,
    payload: category
})

export const categoryClearActive = () => ({
    type: types.categoryClearActive
})