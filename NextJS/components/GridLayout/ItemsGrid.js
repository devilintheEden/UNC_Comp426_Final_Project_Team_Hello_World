import { useState } from 'react'
import CharSVG from '../FontProject/CharSVG'
import charIdx from '../FontProject/charIdx'
import Grid from './grid'
import Pagination from './Pagination'


export default function ItemsGrid(props) {
    const { col, row, count } = props

    const [currentPage, setCurrenPage] = useState(1)

    const pageNum = Math.ceil(count / (col * row))

    const handlePageChange = function (pageIdx) {
        setCurrenPage(pageIdx)
    }

    // Setup the items array for rendering the children of <Grid>
    const start = (currentPage - 1) * col * row
    const end = Math.min(count, currentPage * col * row)
    const items = []
    for (let i = start; i < end; i++) {
        items.push(charIdx[i])
    }

    return (
        <div className='measure center'>
            <Grid>
                {items.map(char =>
                    <CharSVG
                        char={char}
                        width={1 / col}
                        key={char}
                    />)}
            </Grid>
            <Pagination num={pageNum} label={currentPage} onPageChange={handlePageChange} />
        </div>
    )


}