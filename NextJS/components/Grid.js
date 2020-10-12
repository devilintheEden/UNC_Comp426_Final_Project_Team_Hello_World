import charIdx from './charIdx'
import CharSVG from './CharSVG'
export default function Grid(props) {
    const { col, row, count, curPage } = props
    const start = (curPage - 1) * col * row
    const end = Math.min(count, curPage * col * row)
    const items = []
    for (let i = start; i < end; i++) {
        items.push(charIdx[i])
    }
    return (
        <div className='flex flex-wrap w-100'>
            {items.map(char =>
                <CharSVG
                    char={char}
                    width={1 / col}
                    key={char}
                />)}
        </div>
    )



}