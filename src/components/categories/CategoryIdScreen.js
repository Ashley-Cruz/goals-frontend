import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocation, Link } from 'react-router-dom';
import { goalActive, startDelitingGoal } from '../../actions/goal';
import { goalClearActive } from './../../actions/goal';
import { categoryActive } from './../../actions/category';

export const CategoryIdScreen = () => {

    const {activeCategory, categories} = useSelector(state => state.category);
    const {goals, activeGoal} = useSelector(state => state.goal);
    
    const dispatch = useDispatch();

    const location = useLocation();
    const url = location.pathname;

    useEffect(() => {

        if(!activeCategory){
            return <Redirect to="/categories" />
        }

        if(activeCategory){
            const activeIdStore = activeCategory.id;
            const activeIdUrl = url.substring(url.length-24, url.length);
            if(activeIdStore !== activeIdUrl){
                categories.map(category => (category.id === activeIdUrl) && dispatch(categoryActive(category)))
            }
        }

    }, [dispatch, activeCategory, categories, url])

    const borderColor = (boolean) => {
        if(boolean){
            document.getElementById(`${activeGoal.id}`).style.border = `2px solid ${activeCategory.color}`
        }else{
            document.getElementById(`${activeGoal.id}`).style.border = `none`

        }
    }

    useEffect(() => {
        if(activeGoal){
            document.getElementById(`${activeGoal.id}`).style.border = `2px solid ${activeCategory.color}`
        }
    }, [activeGoal, activeCategory])

    const {name, color, icon, id} = activeCategory;

    const handleClick = (id) => {
        goals.map( goal => (goal.id === id) && dispatch(goalActive(goal)));
        if(activeGoal){
            borderColor(false)
        }
    }
    

    const handleClickBackground = () => {
        if(activeGoal){
            borderColor(false)
            dispatch(goalClearActive());
        }
    }

    const handleDelete = () => {
        dispatch(startDelitingGoal());
    }

    return (
        <div className="category__categoryId-main-content" onClick={handleClickBackground}>
            <div className="category__categoryId-content">
                <div className="category__categoryId-circle" style={{border: `2px solid ${color}`}}>
                    <i className={icon} style={{color: `${color}`}}></i>
                </div>
                <p>{name}</p>
            </div>
            <div className="category__categoryId-goals-content">
                {
                    goals.map(goal =>( goal.category === id) && (
                        <div 
                            className="category__categoryId-goal-content" 
                            key={goal.id}
                            id={goal.id}
                            onClick={(e) => {e.preventDefault(); e.stopPropagation(); handleClick(goal.id)}}
                        >
                            <p>{goal.title}</p>
                        </div>
                    ))
                }
                {activeGoal && 
                    <>
                        <div className="category__categoryId-button-delete" onClick={(e) => {e.stopPropagation(); handleDelete()}}>
                            <i className="far fa-trash-alt"></i>
                        </div>
                        <Link to="/goal" className="category__categoryId-button-edit" onClick={(e) => { e.stopPropagation();}} >
                            <i className="far fa-edit"></i>
                        </Link>
                    </>
                }
            </div>
        </div>
    )
}
