import { useEffect, useState } from 'react'
import CharSVG from '../FontProject/CharSVG'
import charIdx from '../FontProject/charIdx'
import Grid from './grid'
import Pagination from './Pagination'

const itemType = {
    char: CharSVG,
    font_in_community: UserFont,
    font_in_myProject: Foo
}

export default function ItemsGrid(props) {
    const { col, row, type, infoList } = props

    const count = infoList.length
    const pageNum = Math.ceil(count / (col * row))
    const SpecificItem = itemType[type]

    const [currentPage, setCurrenPage] = useState(1)
    const [items, setItems] = useState([])


    const handlePageChange = function (pageIdx) {
        setCurrenPage(pageIdx)
    }

    // Setup the items array for rendering the children of <Grid>
    useEffect(() => {
        const start = (currentPage - 1) * col * row
        const end = Math.min(count, currentPage * col * row)
        setItems(infoList.slice(start, end))
    }, [currentPage])


    return (
        <>
            <Grid>
                {items.map(info =>
                    <SpecificItem
                        info={info}
                        width={1 / col}
                        key={info}
                    />)}
            </Grid>
            <Pagination num={pageNum} label={currentPage} onPageChange={handlePageChange} />
        </>
    )


} 