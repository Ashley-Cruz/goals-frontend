import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { Category } from './Category';

export const CategoriesScreen = () => {

    const dispatch = useDispatch();
    const {name} = useSelector(state => state.auth)

    const handleHamburguer = () => {
        document.querySelector(".category__logout-content").classList.toggle('category__show-hide')
    }

    const handleLogout = () => {
        dispatch(startLogout());
    }

    return (
        <>
            <div 
                className="category__hamburguer-content"
                onClick={handleHamburguer}
            >
                <i className="fas fa-bars"></i>
            </div>
            <div className="category__logout-content">
                <h4>{name}</h4>
                <p onClick={handleLogout}>Cerrar Sesión</p>
            </div>

            <div className="base__main-content">
                <div className="base__title-content">
                    <h2>Categorias</h2>
                </div>
                <div className="base__body-content">
                    <Category />
                </div>
            </div>
        </>
    )
}
