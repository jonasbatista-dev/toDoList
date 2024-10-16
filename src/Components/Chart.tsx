import './Chart.scss';
import React from 'react';
import { ResponsiveBarCanvas } from '@nivo/bar';

type tasksType = {
  title: string;
  order: number;
  completed: boolean;
  id: string;
};

interface Props {
  tasks: tasksType[];
}

const getDataForBarChart = (
  tasks: { title: string; order: number; completed: boolean }[],
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

const MyBarChart: React.FC<Props> = ({ tasks }) => {
  const data = getDataForBarChart(tasks);

  const getPercentage = (count: number) =>
    ((count / tasks?.length) * 100).toFixed(2);

  return (
    <div className="chart">
      <ResponsiveBarCanvas
        tooltip={({ indexValue, value }) => (
          <div className="tooltip">
            <strong>{indexValue}</strong>
            <br />
            {`Quantidade: ${value}`}
            <br />
            {`Porcentagem: ${getPercentage(value)}%`}
          </div>
        )}
        data={data}
        keys={['count']}
        indexBy="status"
        margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
        padding={0.3}
        colors={({ indexValue }) =>
          indexValue === 'Feita' ? '#07B87D' : '#DF4459'
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
          legend: 'Quantidade',
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
