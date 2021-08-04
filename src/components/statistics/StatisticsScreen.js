import React from 'react';
import { Doughnut, Bar, Chart } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

export const StatisticsScreen = () => {
    
    const {categories} = useSelector(state => state.category);
    const {goals} = useSelector(state => state.goal);

    let labelCategory = [];
    let borderColor = [];

    let goalsByCategory = [];
    let goalsLengthByCategory = [];

    let pendingGoalsByCategory = [];
    let pendingGoalsLengthByCategory = [];

    let completedgGoalsByCategory = [];
    let completedGoalsLengthByCategory = [];

    categories.forEach((category, index) => {
        
        labelCategory[index] = category.name;
        borderColor[index] = category.color;

        goalsByCategory[index] = goals.filter(goal => goal.category === category.id);
        goalsLengthByCategory[index] = goalsByCategory[index].length;

        pendingGoalsByCategory[index] = goals.filter(goal => (goal.category === category.id && goal.state === 'Pendiente'));
        pendingGoalsLengthByCategory[index] = pendingGoalsByCategory[index].length;

        completedgGoalsByCategory[index] = goals.filter(goal => (goal.category === category.id && goal.state === 'Finalizado'));
        completedGoalsLengthByCategory[index] = completedgGoalsByCategory[index].length;
    });

    const dataDoughnut = {
        labels: labelCategory,
        datasets: [
          {
            label: '# de Metas',
            data: goalsLengthByCategory,
            backgroundColor: ['#363845'],
            borderColor: borderColor
          },
        ],
    };

    const optionsDoughnut = {
        responsive: true,
        maintainAspectRatio: false
    }

    const dataBar = {
        labels: labelCategory,
        datasets: [
            {
                label: 'Pendientes',
                data: pendingGoalsLengthByCategory,
                backgroundColor: 'rgba(255, 0, 0, 0.1)',
                borderColor: 'rgba(255, 0, 0, 0.5)',
                borderWidth: 2,
                stack: 1
            },
            {
                label: 'Finalizadas',
                data: completedGoalsLengthByCategory,
                backgroundColor: "rgba(0, 255, 0, 0.1)",
                borderColor: 'rgba(0, 255, 0, 0.5)',
                borderWidth: 2,
                stack: 1
            }
        ],
    }

    Chart.defaults.color = 'rgba(255, 255, 255, 1)';

    const optionsBar = {
        scales: {
            xAxes: [{
                stacked: true,
            }],
            yAxes: [{
                stacked: true
            }],
        },
        responsive: true,
        maintainAspectRatio: false,
    }

    return (
        <div className="base__main-content">
            <div className="base__title-content">
                <h2>Estadísticas</h2>
                
            </div>
            <div className="base__body-content statistics__main-content">
                <div className="statistics__doughnut-content">
                    <Doughnut 
                        data={dataDoughnut}
                        options={optionsDoughnut}
                    />
                </div>
                <div className="statistics__bar-content">
                    <Bar 
                        data={dataBar}
                        options={optionsBar}
                    />
                </div>
            </div>
        </div>
    )
}
