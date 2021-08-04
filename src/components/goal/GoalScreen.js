import React from 'react';
import { useSelector } from 'react-redux';
import { GoalForm } from './GoalForm';

export const GoalScreen = () => {

    const {activeGoal} = useSelector(state => state.goal)

    return (
        <div className="base__main-content">
            <div className="base__title-content">
                {activeGoal ? <h2>Editar meta</h2> : <h2>Agregar meta</h2>}
                
            </div>
            <div className="base__body-content">
                <GoalForm />
            </div>
        </div>
    )
}
