import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Box } from '@mui/material';

export default function PieChartWithPaddingAngle({sessionData}) 
{
  const completed = sessionData.sessions.filter((session) => session.status === 'Completed').length;
  const pending = sessionData.sessions.length - completed;

  const data = 
  [
    { label: 'Completed', value: completed, color:'#3DC296'},
    { label: 'Upcoming', value: pending, color:'#F9E2AF'},
  ];

  return (
     <Box sx={{ border: 'none' }}>
        <PieChart
        series={[
          {
            paddingAngle: 5,
            innerRadius: 50,
            outerRadius: 75,
            data,
            borderWidth:0,
          },
        ]}
        margin={{ right: 5 }}
        width={200}
        height={200}
        legend={{ hidden: true }}
      />
     </Box>
  );
}