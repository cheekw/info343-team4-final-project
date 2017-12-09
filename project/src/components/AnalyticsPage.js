import React from 'react';
import {Bar} from 'react-chartjs-2';

const data = {
    labels: ['Soup 1', 'Soup 2', 'Soup 3', 'Soup 4', 'Soup 5', 'Soup 6', 'Soup 7', 'Soup 8', 'Soup 9', 'Soup 10', 'Soup 11', 'Soup 12'],
    datasets: [
      {
        label: 'Favorites per Item',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [12, 10, 8, 6, 4, 2, 0, 4, 7, 3, 4, 6,]
      }
    ]
  };

    export default class AnalyticsPage extends  React.Component{

      
        render() {
          return (
            <div>
              <h2>Most Favorited Soups</h2>
              <Bar
                data={data}
                width={50}
                height={50}
                options={{
                  maintainAspectRatio: false
                }}
              />
            </div>
          );
        }
      };