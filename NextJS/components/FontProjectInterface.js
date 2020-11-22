import fetch from "isomorphic-unfetch";
import DownloadPDFForm from "./GeneTTFRelated/DownloadPDFForm";
import UploadPDFForm from "./GeneTTFRelated/UploadPDFForm";
import ShowCaseSVG from "./ShowCaseSVG/ShowCaseSVG";
import GenerateTTF from "./GeneTTFRelated/GenerateTTF";
import { number } from "prop-types";

export default class FontProjectInterface extends React.Component {

    constructor(props) {
        super(props);
        this.state = { pid: this.props.pid, project_name: "Default Project Name", uploaded: 0, downloaded: false, width: '1', height: '1' };
        this.handleDownloadSubmit = this.handleDownloadSubmit.bind(this);
        this.handleUploadSubmit = this.handleUploadSubmit.bind(this);
        this.project_info = {};
        this.getProjectinfo(this.props.pid);
    }

    handleDownloadSubmit(child_state) {
        this.setState({ downloaded: true, width: child_state.width, height: child_state.height });
    }

    handleUploadSubmit() {
        this.setState({ uploaded: this.state.uploaded + 1 });
    }

    getProjectinfo(pid){
        fetch("http://localhost:3000/api/getProjectInfo", {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify({
                    pid: pid,
                    timeStamp: new Date(),
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.fail  !==  true) {
                        this.setState({ project_name: data.projectName, uploaded: data.related.uploaded, downloaded: data.related.downloaded, width: number.toString(data.related.ratio_w), height: number.toString(data.related.ratio_h)});
                        this.project_info = data;
                    }
                });
        }

    render() {
        return (
            <div className="w-100 min-h-100 overflow-auto dt">
                <div className="bg-light-blue h-100 dtc v-top" >
                    {this.props.uid === this.project_info.usrOwn ?
                    (<div className="center">
                    <h2 className="mt0 mb2 pa2">{this.state.project_name}</h2>
                    <DownloadPDFForm project_name={this.state.project_name} usr_id={this.usr_id} updateProjectWH={this.handleDownloadSubmit} />
                    <UploadPDFForm project_name={this.state.project_name} usr_id={this.usr_id} pdfWH={this.state} hasUploaded={this.handleUploadSubmit} uploaded={this.state.uploaded}/>
                    <GenerateTTF project_name={this.state.project_name} usr_id={this.usr_id} bool_prep={this.state.uploaded} />
                    </div>):null}
                </div>
                <div className="w-75 bg-lightest-blue h-100 dtc v-mid">
                    <ShowCaseSVG project_name={this.state.project_name} usr_id={this.usr_id} bool_show={this.state.uploaded} col='6' row='4' count='95' type='char' />
                </div>
            </div>
        )
    }
}