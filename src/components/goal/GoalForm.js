import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startAddingGoal, startUpdatingGoal } from './../../actions/goal';

const initialState = {
    title: '',
    state: '',
    category: ''
}

export const GoalForm = () => {

    const dispatch = useDispatch();

    const {categories} = useSelector(state => state.category);
    const {uid:user} = useSelector(state => state.auth)
    const {activeGoal} = useSelector(state => state.goal)

    const [formValues, setFormValues] = useState(initialState);
    const {title, state, category} = formValues;
    
    const [errorCategory, setErrorCategory] = useState(false);
    const [errorTitle, setErrorTitle] = useState(false);
    const [errorState, setErrorState] = useState(false);

    useEffect(() => {
        if(activeGoal){
            const {title, state, category} = activeGoal;
            setFormValues({title, state, category});
        }else{
            setFormValues(initialState)
        }
    }, [setFormValues, activeGoal])

    const handleChange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();

        if(category.trim().length <= 1) return setErrorCategory(true);
        setErrorCategory(false);

        if(title.trim().length <= 1) return setErrorTitle(true);
        setErrorTitle(false);

        if(state.trim().length <= 1) return setErrorState(true);
        setErrorState(false);

        if(activeGoal){
            dispatch(startUpdatingGoal({...formValues, user}))
        }else {
            dispatch(startAddingGoal({...formValues, user}));
            setFormValues(initialState)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="goal__main-form-content">

            <div className="goal__form-content">
                <label>Categoría</label>
                <select onChange={handleChange} name="category" value={category}>
                    <option value=''>- Seleccionar -</option>
                    {
                        categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))
                    }
                </select>
                {errorCategory && <p className="goal__error">La categoría es obligatoria</p>}
            </div>

            <div className="goal__form-content">
                <label>Inspírate</label>
                <input 
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleChange}
                    placeholder="Un título increible..."
                    autoComplete="off"
                />
                {errorTitle && <p className="goal__error">No es un título válido</p>}
            </div>

            <div className="goal__form-content">
                <label>Estado</label>
                <select onChange={handleChange} name="state" value={state}>
                    <option value=''>- Seleccionar -</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Finalizado">Finalizado</option>
                </select>
                {errorState && <p className="goal__error">El estado es obligatorio</p>}
            </div>
            
            {
                activeGoal 
                    ? 
                        <button type="submit" className="goal__form-content goal__form-button">
                            Actualizar
                        </button>
                    :
                        <button type="submit" className="goal__form-content goal__form-button">
                            Agregar
                        </button>
            }

        </form>
    )
}
