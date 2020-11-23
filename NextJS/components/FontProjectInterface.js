import fetch from "isomorphic-unfetch";
import DownloadPDFForm from "./GeneTTFRelated/DownloadPDFForm";
import UploadPDFForm from "./GeneTTFRelated/UploadPDFForm";
import ShowCaseSVG from "./ShowCaseSVG/ShowCaseSVG";
import GenerateTTF from "./GeneTTFRelated/GenerateTTF";
import { number } from "prop-types";

export default class FontProjectInterface extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOwner: false,
            pid: this.props.pid,
            project_name: "Default Project Name",
            uploaded: 0,
            downloaded: false,
            width: "1",
            height: "1",
        };
        this.handleDownloadSubmit = this.handleDownloadSubmit.bind(this);
        this.handleUploadSubmit = this.handleUploadSubmit.bind(this);
        this.project_info = {};
        this.getProjectinfo(this.props.pid);
    }

    handleDownloadSubmit(child_state) {
        this.setState({
            downloaded: true,
            width: child_state.width,
            height: child_state.height,
        });
        fetch("http://localhost:3000/api/projectUpdate", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
                pid: this.state.pid,
                "related.downloaded": true,
                "related.ratio_w": parseInt(child_state.width, 10),
                "related.ratio_h": parseInt(child_state.height, 10),
                timeStamp: new Date(),
            }),
        }).then();
    }   

    handleUploadSubmit() {
        fetch("http://localhost:3000/api/projectUpdate", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
                pid: this.state.pid,
                "related.uploaded": this.state.uploaded + 1,
                timeStamp: new Date(),
            }),
        }).then();
        this.setState({ uploaded: this.state.uploaded + 1 });
    }

    getProjectinfo(pid) {
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
                if (data.fail !== true) {
                    this.setState({
                        project_name: data.projectName,
                        uploaded: data.related.uploaded,
                        downloaded: data.related.downloaded,
                        width: data.related.ratio_w.toString(10),
                        height: data.related.ratio_h.toString(10),
                    });
                    this.project_info = data;
                    this.setState({
                        isOwner: this.props.uid === this.project_info.userOwn,
                    });
                }
            });
    }

    render() {
        return (
            <div className="w-100 min-h-100 overflow-auto dt">
                <div className="bg-light-blue h-100 dtc v-top">
                    {this.state.isOwner ? (
                        <div className="center">
                            <h2 className="mt0 mb2 pa2">
                                {this.state.project_name}
                            </h2>
                            <DownloadPDFForm
                                pid={this.state.pid}
                                uid={this.props.uid}
                                w = {this.state.width}
                                h = {this.state.height}
                                updateProjectWH={this.handleDownloadSubmit}
                            />
                            <UploadPDFForm
                                pid={this.state.pid}
                                uid={this.props.uid}
                                pdfWH={this.state}
                                hasUploaded={this.handleUploadSubmit}
                                uploaded={this.state.uploaded}
                            />
                            <GenerateTTF
                                pid={this.state.pid}
                                uid={this.props.uid}
                                bool_prep={this.state.uploaded}
                            />
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
                <div className="w-75 bg-lightest-blue h-100 dtc v-mid">
                    <ShowCaseSVG
                        pid={this.state.pid}
                        uid={this.props.uid}
                        bool_show={this.state.uploaded}
                        col="6"
                        row="4"
                        count="95"
                        type="char"
                    />
                </div>
            </div>
        );
    }
}
