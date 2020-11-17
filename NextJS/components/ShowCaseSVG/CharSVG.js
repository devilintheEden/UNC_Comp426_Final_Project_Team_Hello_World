const path = require("path");

export default function CharSVG(props) {
    const {project_name, usr_id, index, char, width, updated } = props
    const dir = path.join('Backend', 'Users', `${usr_id}`, 'Projects', `${project_name}`, `Uploads`, `Images_From_PDF`, index + '_' + updated + `.svg`);
    return (
        <div
            className='char tc'
            style={{ width: width * 100 + '%' }}
        >
            <img key={Date.now()} src={dir}/>
            <p> {char} </p>
        </div>
    )
}