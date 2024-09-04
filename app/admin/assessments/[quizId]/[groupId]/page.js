'use client'

import { useParams } from 'next/navigation'
import styles from './styles.module.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import UserCard from '@/app/components/userCard/UserCard';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { calculatePercentile } from '@/utility/calculateScores';
import { CircularProgress } from '@mui/material';

const Group = () =>
{
    const { groupId } = useParams();
    const [ groupData, setGroupData ] = useState(null);

    useEffect(()=>
    {
        getGroup();
    },[])

    const getGroup = async () =>
    {
        const url = `/api/group/${groupId}`
        const response = await axios.get(url)
        setGroupData(response.data)
    }

    return(
        <div className={styles.wrapper}>
            {groupData ? <div className={styles.container}>
            <p className={styles.header}>Assessment Scores</p>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="customized table">
                <TableHead>
                    <TableRow className={styles.rowHeader} >
                        <TableCell  className={styles.headerCell}>No.</TableCell>
                        <TableCell className={styles.headerCell}>Name</TableCell>
                        <TableCell className={styles.headerCell}>Score</TableCell>
                        <TableCell className={styles.headerCell}>Percentile</TableCell>
                        <TableCell className={styles.headerCell}>Result</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {groupData?.assignment?.map((data, index) => (
                    <TableRow key={data.user.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell className={styles.cell}>{index+1}</TableCell>
                        <TableCell className={styles.cell}>{data.user.name}</TableCell>
                        <TableCell className={styles.cell}>{data.test.status === 'Completed' ? data.test.score+'/'+data.test.quiz.length : 'NA'}</TableCell>
                        <TableCell className={styles.cell}>{data.test.status === 'Completed' ? calculatePercentile(data.test.score, data.test.quiz.length)+'%' : 'NA'}</TableCell>
                        <TableCell className={styles.cell}>{data.test.status === 'Completed' ? (calculatePercentile(data.test.score, data.test.quiz.length) > 75 ? 'Pass' : 'Fail') : 'NA' }</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
        </div>:
        <div className={styles.spinner}>
            <CircularProgress sx={{color: '#D4313D'}} />
        </div>}
        </div>
    )
}

export default Group


// import * as React from 'react';


// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number,
// ) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

// export default function BasicTable() {
//   return (
    
//   );
// }