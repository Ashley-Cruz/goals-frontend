import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { categoryActive } from './../../actions/category';

export const Category = () => {

    const dispatch = useDispatch();
    const {categories} = useSelector(state => state.category);

    const handleClick = (id) => {
        categories.map( category => (category.id === id) && dispatch(categoryActive(category)));
    }

    return (
        <div className="category__category-main-content">
            {
                categories.map(category => (
                    <div className="category__category-content" key={category.id} onClick={() => handleClick(category.id)}>
                        <Link className="category__category-circle" to={`/categories/${category.id}`} style={{border: `2px solid ${category.color}`}}>
                            <i className={category.icon} style={{color: `${category.color}`}}></i>
                        </Link>
                        <p className="category__category-text">{category.name}</p>
                    </div>
                ))
            }
        </div>
    )
}
