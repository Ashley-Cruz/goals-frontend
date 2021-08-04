import React from 'react';
import { CategoriesScreen } from './../components/categories/CategoriesScreen';
import { StatisticsScreen } from './../components/statistics/StatisticsScreen';
import { GoalScreen } from './../components/goal/GoalScreen';
import { CategoryIdScreen } from './../components/categories/CategoryIdScreen';
import {
    Switch,
    Route,
    Redirect,
    Link
} from "react-router-dom";

export const GoalsRouter = () => {

    return (
        <div className="base__wrapper">
            <div className="base__wrapper-content-1">
                <Switch>
                    <Route exact path="/categories" component={CategoriesScreen} />
                    <Route exact path="/categories/:categoryId" component={CategoryIdScreen} />
                    <Route exact path="/goal" component={GoalScreen} />
                    <Route exact path="/statistics" component={StatisticsScreen} />

                    <Redirect to='/categories' />
                </Switch>
            </div>
            <div className="base__wrapper-content-2">
                <Link to="/categories"><i className="fas fa-home"></i></Link>
                <Link to="/goal"><i className="fas fa-plus"></i></Link>
                <Link to="/statistics"><i className="fas fa-signal"></i></Link>
            </div>
        </div>
    )
}
