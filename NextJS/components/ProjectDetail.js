import { useState } from 'react'
import Grid from './grid'
import Pagination from './Pagination'

export default function ProjectDetail(props) {
    const [currentPage, setCurrenPage] = useState(1)

    const col = 3
    const row = 4
    // the number of total items
    const count = 95
    const pageNum = Math.ceil(count / (col * row))

    const handlePageChange = function (pageIdx) {
        setCurrenPage(pageIdx)
    }

    return (
        <div className='prjDetail measure center'>
            <Grid col={col} row={row} curPage={currentPage} count={count} />
            <Pagination num={pageNum} label={currentPage} onPageChange={handlePageChange} />
        </div>
    )


}