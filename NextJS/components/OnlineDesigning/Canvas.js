import * as d3 from 'd3'
import { useState, useEffect } from 'react'
export default function Canvas() {

    const [{ x, y, k }, setTransform] = useState({ x: 0, y: 0, k: 1 })

    useEffect(() => {
        const svg = d3.select('svg')
        const width = svg.attr('width')
        const height = svg.attr('height')
        const zoom = d3.zoom().on("zoom", function (e) {
            setTransform(e.transform)
        })

        svg.call(zoom)

    })

    return (
        <div className='mw8 bg-gray mt5 center tc'>
            <svg width='64rem' height='64rem'>
                <g transform={`translate(${x}, ${y}) scale(${k})`}>
                    <circle cx='50%' cy='50%' r='16rem' fill='white' />
                </g>
            </svg>
        </div>
    )
}