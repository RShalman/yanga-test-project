import React, {useCallback, useEffect, useState} from 'react'
import Pagination from "@material-ui/lab/Pagination";

import Record from "./Record";
import {dataPaginator, obtainData} from "../utils";
import S from './records.module.scss'
import Button from "@material-ui/core/Button";

const requests = ['https://reqres.in/api/users?page=1', 'https://reqres.in/api/users?page=2']

const Records = ({setIsAuth}) => {
    const [records, setRecords] = useState({perPage: 1, total: 1, data: null})
    const [page, setPage] = useState(1)
    const { perPage, total, data } = records

    const handlePagination = useCallback((_, val) => setPage(val), [])
    const handleExit = useCallback(() => setIsAuth(false), [])

    useEffect(async () => {
        setRecords(await obtainData(requests, 3000))
    }, [])

    return <>{
        data ?
            <>
                <div className={S.buttonWrapper}>
                    <Button variant="contained" size="large" color="primary" onClick={handleExit}>Exit</Button>
                </div>
                <div className={S.records}>
                    {dataPaginator(data, page, perPage).map(rec =>
                        <Record key={rec.id} {...rec}/>)
                    }
                </div>
                <div className={S.paginationWrapper}>
                    <Pagination count={total / perPage} onChange={handlePagination}/>
                </div>
            </>
            :
            <div className={S.loader}>
                <p>Loading</p>
            </div>
    }</>
}

export default Records