'use client'

import { useParams, usePathname } from 'next/navigation'
import styles from './styles.module.css'
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { calculatePercentile, calculateResult } from '@/utility/calculateScores';
import { CircularProgress } from '@mui/material';
import { FormatDate } from '@/utility/FormatDate';
import Image from 'next/image';
import downloadIcon from '@/assets/download.png'
import fints from '@/assets/fints.png'
import { toPng } from 'html-to-image';
import Loading from '@/app/components/loading/Loading';

const Group = () =>
{
    const { groupId } = useParams();
    const divRef = useRef(null);
    const pathname  = usePathname();
    const [ groupData, setGroupData ] = useState(null);
    const [ showDetails, setShowDetails ] = useState(false)
    const quizName = pathname.split('/')[3]

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

    const downloadScores = () => 
    {   
        if(divRef.current === null) 
            return

        toPng(divRef.current, { cacheBust: true, })
        .then((dataUrl) => {
            const link = document.createElement('a')
            link.download = `${groupData.batch.title}.png`
            link.href = dataUrl
            link.click()
        })
        .catch((err) => 
        {
            console.log(err)
        })
    }

    console.log(groupData)

    return(
        <div className={styles.wrapper}>
            {groupData ? 
            <div className={styles.container} ref={divRef}>
                <div className={styles.group}>
                    <Image className={styles.fints} src={fints} alt='fints'/>
                    <span className={styles.course} onClick={()=> setShowDetails(!showDetails)}>{groupData.batch.course.title}</span>
                </div>
                {showDetails && 
                <div className={styles.header}>
                    <div className={styles.details}>
                        <span className={styles.heading}>Sprint code</span>
                        <span className={styles.data}>{groupData.batch.title}</span>
                    </div>
                    <div className={styles.details}>
                        <span className={styles.heading}>Date</span>
                        <span className={styles.data}>{FormatDate(groupData.batch.startDate) +' - ' +FormatDate(groupData.batch.endDate)}</span>
                    </div>
                    <div className={styles.details}>
                        <span className={styles.heading}>Mentor</span>
                        <span className={styles.data}>{groupData.batch.mentor.name}</span>
                    </div>
                    <div className={styles.details}>
                        <span className={styles.heading}>Attempt</span>
                        <span className={styles.data}>{quizName[0]}</span>
                    </div>
                    <div className={styles.details}>
                        <span className={styles.heading}>Qualifying score</span>
                        <span className={styles.data}>{groupData.tests[0].quizDetails.quiz.length*.75 +'/'+groupData.tests[0].quizDetails.quiz.length}</span>
                    </div>
                    <div className={styles.details}>
                        <span className={styles.heading}>Competency rate</span>
                        <span className={styles.data}>{Math.ceil(groupData.tests.filter((test)=> test.status === 'Completed' && calculatePercentile(test.score, test.quizDetails.quiz.length) >=75).length * 100 / groupData.tests.length)}%</span>
                    </div>
                </div>}
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
                    {groupData?.tests?.map((test, index) => (
                    <TableRow key={test._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell className={styles.cell}>{index+1}</TableCell>
                        <TableCell className={styles.cell}>{test.enrollment.user.name}</TableCell>
                        <TableCell className={styles.cell}>{test.status === 'Completed' ? test.score+'/'+test.quizDetails.quiz.length : 'NA'}</TableCell>
                        <TableCell className={styles.cell}>{test.status === 'Completed' ? calculatePercentile(test.score, test.quizDetails.quiz.length)+'%' : 'NA'}</TableCell>
                        <TableCell className={styles.cell}>{test.status === 'Completed' ? calculateResult(test.score, test.quizDetails.quiz.length) : 'NA' }</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
            <button className={styles.download} onClick={downloadScores}>
                <Image  className={styles.downloadIcon} src={downloadIcon} alt='download'/>
            </button>
        </div>:
        <Loading/>}
        </div>
    )
}

export default Group
