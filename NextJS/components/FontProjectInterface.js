import DownloadPDFForm from "./DownloadPDFForm";
import UploadPDFForm from "./UploadPDFForm";
import ShowCaseSVG from "./ShowCaseSVG";
import GenerateTTF from "./GenerateTTF";

export default class FontProjectInterface extends React.Component {

    constructor(props) {
        super(props);
        this.usr_id = 0;
        this.state = { project_name: "Default Project Name", uploaded: false, downloaded: false, width: '1', height: '1' };
        this.handleDownloadSubmit = this.handleDownloadSubmit.bind(this);
        this.handleUploadSubmit = this.handleUploadSubmit.bind(this);
    }

    handleDownloadSubmit(child_state) {
        this.setState({ downloaded: true, width: child_state.width, height: child_state.height });
    }

    handleUploadSubmit() {
        this.setState({ uploaded: true });
    }

    render() {
        return (
            <div>
                <DownloadPDFForm project_name={this.state.project_name} usr_id={this.usr_id} updateProjectWH={this.handleDownloadSubmit} />
                <br/><br/>
                <UploadPDFForm project_name={this.state.project_name} usr_id={this.usr_id} pdfWH={this.state} hasUploaded={this.handleUploadSubmit} />
                <br/><br/>
                <ShowCaseSVG project_name={this.state.project_name} usr_id={this.usr_id} bool_show={this.state.uploaded} />
                <br/><br/>
                <GenerateTTF project_name={this.state.project_name} usr_id={this.usr_id} bool_prep={this.state.uploaded}/>
            </div>
        )
    }
}