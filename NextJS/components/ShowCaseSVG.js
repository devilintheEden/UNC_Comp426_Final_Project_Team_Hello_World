const path = require("path");

export default class ShowCaseSVG extends React.Component {
    render(){
        if(this.props.bool_show){
            const path_1 = path.join('Backend','Users', `${this.props.usr_id}`, 'Projects', `${this.props.project_name}`, `Uploads`, `Images_From_PDF`, `0.svg`);
            const path_2 = path.join('Backend','Users', `${this.props.usr_id}`, 'Projects', `${this.props.project_name}`, `Uploads`, `Images_From_PDF`, `1.svg`);
            return (<div>
                <img src= {path_1}></img>
                <img src= {path_2}></img>
            </div>)
        }
        else{
            return(<div></div>)
        }
    }
}