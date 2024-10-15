import './Chart.scss';
import React from 'react';
import { ResponsiveBarCanvas } from '@nivo/bar';

const getDataForBarChart = (
  tasks: { title: string; order: Number; completed: boolean }[],
) => {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const incompleteTasks = tasks.filter((task) => !task.completed).length;

  return [
    {
      status: 'Feita',
      count: completedTasks,
    },
    {
      status: 'Por fazer',
      count: incompleteTasks,
    },
  ];
};

const MyBarChart: React.FC<{ tasks: any }> = ({ tasks }) => {
  const data = getDataForBarChart(tasks);

  return (
    <div className="chart">
      <ResponsiveBarCanvas
        data={data}
        keys={['count']}
        indexBy="status"
        margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
        padding={0.3}
        colors={({ indexValue }) =>
          indexValue === 'Feita' ? '#93D077' : '#F44E3F'
        }
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Status',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      />
    </div>
  );
};

export default MyBarChart;
