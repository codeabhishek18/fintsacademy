import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function EnrollmentBarGraph({data}) 
{

  console.log(data)

  const months = data.map((item)=> item.month);
  const enrollment = data.map((item)=> item.enrollments);

  return (
    <BarChart
      xAxis={[
        {
          id: 'barCategories',
          data: months,
          scaleType: 'band',
        },
      ]}
      series={[
        {
          id: 'Enrollments',
          data: enrollment,
        },
      ]}
      colors={'red'}
      width={500}
      height={300}
    />
  );
}