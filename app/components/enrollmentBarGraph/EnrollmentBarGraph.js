import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

const valueFormatter = (value) => `${value}`;

const chartSetting = {
  yAxis: [
    {
      label: 'Enrollments'
    },
  ],
  series: [{ dataKey: 'enrollments', label: 'Enrollments', valueFormatter }],
  height: 300,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: 'translateX(-10px)',
    }
  },
};

export default function EnrollmentBarGraph({data}) 
{

  return (
    <div>
      <BarChart
        dataset={data}
        xAxis=
        {[
          { scaleType: 'band', dataKey: 'month',colorMap: {
            type: 'piecewise',
            thresholds: [new Date(2021, 1, 1), new Date(2023, 1, 1)],
            colors: ['#D4313D'],
            stroke: 'white'
          }}  
        ]}
        {...chartSetting}
        />
    </div>
  );
}