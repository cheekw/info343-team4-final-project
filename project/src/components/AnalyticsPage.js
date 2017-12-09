import React from 'react';
import { Line } from 'react-chartjs-2';

var chartData = [
    {
      udonName: "Soup Udon",
      favorites: 5
    },
    {
        udonName: "Soup Udon",
        favorites: 5
    },
    {
        udonName: "Soup Udon",
        favorites: 5
      },
      {
        udonName: "Soup Udon",
        favorites: 5
      },
      {
        udonName: "Soup Udon",
        favorites: 5
      },
      {
        udonName: "Soup Udon",
        favorites: 5
      },
      {
        udonName: "Soup Udon",
        favorites: 5
      },
      {
        udonName: "Soup Udon",
        favorites: 5
      },
      {
        udonName: "Soup Udon",
        favorites: 5
      },
      {
        udonName: "Soup Udon",
        favorites: 5
      },
      {
        udonName: "Soup Udon",
        favorites: 5
      },
    
]

export default class AnalyticsPage extends React.Component {
    render() {
        return (
            <div>
                <Line />
            </div>
        );
    }
}