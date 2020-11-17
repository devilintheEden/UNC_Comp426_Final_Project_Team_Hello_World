import fetch from "isomorphic-unfetch";
import DownloadPDFForm from "./GeneTTFRelated/DownloadPDFForm";
import UploadPDFForm from "./GeneTTFRelated/UploadPDFForm";
import ShowCaseSVG from "./ShowCaseSVG/ShowCaseSVG";
import GenerateTTF from "./GeneTTFRelated/GenerateTTF";

export default class FontProjectInterface extends React.Component {

    constructor(props) {
        super(props);
        this.usr_id = 0;
        this.state = { project_name: "Default Project Name", uploaded: 0, downloaded: false, width: '1', height: '1' };
        this.handleDownloadSubmit = this.handleDownloadSubmit.bind(this);
        this.handleUploadSubmit = this.handleUploadSubmit.bind(this);
    }

    handleDownloadSubmit(child_state) {
        this.setState({ downloaded: true, width: child_state.width, height: child_state.height });
    }

    handleUploadSubmit() {
        this.setState({ uploaded: this.state.uploaded + 1 });
    }

    render() {
        return (
            <div className="w-100 min-h-100 overflow-auto dt">
                <div className="bg-light-blue h-100 dtc v-top" >
                    <div className="center">
                    <h2 className="mt0 mb2 pa2">Font Project</h2>
                    <DownloadPDFForm project_name={this.state.project_name} usr_id={this.usr_id} updateProjectWH={this.handleDownloadSubmit} />
                    <UploadPDFForm project_name={this.state.project_name} usr_id={this.usr_id} pdfWH={this.state} hasUploaded={this.handleUploadSubmit} uploaded={this.state.uploaded}/>
                    <GenerateTTF project_name={this.state.project_name} usr_id={this.usr_id} bool_prep={this.state.uploaded} />
                    </div>
                </div>
                <div className="w-75 bg-lightest-blue h-100 dtc v-mid">
                    <ShowCaseSVG project_name={this.state.project_name} usr_id={this.usr_id} bool_show={this.state.uploaded} col='6' row='4' count='95' type='char' />
                </div>
            </div>
        )
    }
}