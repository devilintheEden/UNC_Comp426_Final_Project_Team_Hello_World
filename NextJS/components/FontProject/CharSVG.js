export default function CharSVG(props) {
    const { char, width } = props

    return (
        <div
            className='char tc'
            style={{ width: width * 100 + '%' }}
        >
            <img src="https://placeholder.pics/svg/100/DEDEDE/555555/1" width='100%' />
            <p> {char} </p>
        </div>
    )
}